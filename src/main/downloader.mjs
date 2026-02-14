import fs from 'fs';
import path from 'path';
import https from 'https';
import { pipeline } from 'stream/promises';
import { Readable, Transform } from 'stream';

export const ORIGIN = 'https://maktabkhooneh.org';

class SimpleCookieStore {
    constructor() { this.map = new Map(); }
    setCookieLine(line) {
        if (!line) return;
        const seg = line.split(';')[0];
        const eq = seg.indexOf('=');
        if (eq === -1) return;
        const k = seg.slice(0, eq).trim();
        const v = seg.slice(eq + 1).trim();
        if (k) this.map.set(k, v);
    }
    applySetCookie(arr) { (arr || []).forEach(l => this.setCookieLine(l)); }
    get(name) { return this.map.get(name); }
    headerString() { return Array.from(this.map.entries()).map(([k, v]) => `${k}=${v}`).join('; '); }
}

class ByteLimit extends Transform {
    constructor(limit, onLimit) {
        super();
        this.limit = limit;
        this.seen = 0;
        this._hit = false;
        this._onLimit = onLimit;
    }
    _transform(chunk, enc, cb) {
        if (this.limit <= 0) { this.push(chunk); return cb(); }
        const remaining = this.limit - this.seen;
        if (remaining <= 0) { return cb(); }
        const buf = chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
        this.push(buf);
        this.seen += buf.length;
        if (!this._hit && this.seen >= this.limit) {
            this.end();
            this._hit = true;
            if (typeof this._onLimit === 'function') {
                try { this._onLimit(); } catch { }
            }
        }
        cb();
    }
}

class Gate extends Transform {
    constructor() {
        super();
        this._held = false;
        this._resumePromise = null;
        this._resolveResume = null;
    }
    // Named hold/release to avoid shadowing Node.js Transform's native pause()/resume()
    // which are called internally by pipeline() for backpressure management.
    hold() { this._held = true; }
    release() {
        this._held = false;
        if (this._resolveResume) {
            this._resolveResume();
            this._resolveResume = null;
            this._resumePromise = null;
        }
    }
    async _transform(chunk, enc, cb) {
        if (this._held) {
            if (!this._resumePromise) {
                this._resumePromise = new Promise(res => this._resolveResume = res);
            }
            await this._resumePromise;
        }
        this.push(chunk);
        cb();
    }
}

class Throttle extends Transform {
    constructor(bytesPerSecond) {
        super();
        this.bps = bytesPerSecond;
        this.totalSent = 0;
        this.startTime = Date.now();
    }
    _transform(chunk, enc, cb) {
        if (this.bps <= 0) {
            this.push(chunk);
            return cb();
        }
        this.totalSent += chunk.length;
        const elapsed = (Date.now() - this.startTime) / 1000;
        const expectedTime = this.totalSent / this.bps;
        const delay = (expectedTime - elapsed) * 1000;

        if (delay > 0) {
            setTimeout(() => {
                this.push(chunk);
                cb();
            }, Math.min(delay, 5000)); // Max delay of 5s to prevent long hanging
        } else {
            this.push(chunk);
            cb();
        }
    }
}

class Downloader {
    constructor(webContents, sessionFilePath) {
        this.webContents = webContents;
        this.sessionFilePath = sessionFilePath;
        this.activeCookie = null;
        this.UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
        this.activeDownloads = new Map(); // filePath -> { controller, gate }
    }

    sendToUI(channel, data) {
        if (this.webContents && !this.webContents.isDestroyed()) {
            try {
                this.webContents.send(channel, data);
            } catch (e) {
                console.error(`Error sending to UI (${channel}):`, e.message);
            }
        }
    }

    log(message, type = 'info') {
        this.sendToUI('downloader-log', { type, message });
    }

    async fetchWithTimeout(resource, options = {}) {
        // Increase default timeout to 90s for problematic networks
        const { timeout = 90000 } = options;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);

        try {
            // Ensure no connection-level timeout from undici is shorter than our threshold
            // Although we can't easily set dispatcher here without the dependency, 
            // AbortController is our primary tool.
            return await fetch(resource, { ...options, signal: controller.signal });
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async fetchWithRetry(resource, options = {}, retries = 10, delay = 1500) {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return await this.fetchWithTimeout(resource, options);
            } catch (err) {
                lastError = err;
                const isTransient =
                    err.message?.includes('EADDRNOTAVAIL') ||
                    err.message?.includes('ECONNRESET') ||
                    err.message?.includes('ETIMEDOUT') ||
                    err.message?.includes('ENOTFOUND') ||
                    err.message?.includes('ECONNREFUSED') ||
                    err.message?.includes('EHOSTUNREACH') ||
                    err.name === 'AbortError' ||
                    err.code === 'UND_ERR_CONNECT_TIMEOUT' ||
                    err.code === 'UND_ERR_HEADERS_TIMEOUT';

                if (!isTransient) throw err;

                // For EADDRNOTAVAIL, use a longer delay to let OS recycle ports
                const baseDelay = err.message?.includes('EADDRNOTAVAIL') ? delay * 2 : delay;
                const waitTime = Math.min(30000, baseDelay * Math.pow(2, i) + (Math.random() * 2000));

                this.log(`اختلال شبکه (${err.code || 'TIMEOUT'}). تلاش ${i + 1}/${retries} در ${Math.round(waitTime / 1000)} ثانیه...`, 'warn');
                await new Promise(res => setTimeout(res, waitTime));
            }
        }
        throw lastError;
    }

    commonHeaders(referer) {
        const headers = {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,fa;q=0.8',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': this.UA,
        };
        if (this.activeCookie) headers['cookie'] = this.activeCookie;
        if (referer) {
            try {
                headers['referer'] = encodeURI(referer);
            } catch (e) {
                headers['referer'] = referer;
            }
        }
        return headers;
    }

    async rawRequest(urlStr, { method = 'GET', headers = {}, body = null } = {}) {
        const u = new URL(urlStr);
        return new Promise((resolve, reject) => {
            const opts = {
                method,
                hostname: u.hostname,
                path: u.pathname + (u.search || ''),
                protocol: u.protocol,
                headers,
                timeout: 30000 // 30s connect timeout
            };

            const req = https.request(opts, (res) => {
                const chunks = [];
                res.on('data', c => chunks.push(c));
                res.on('end', () => {
                    const headersObj = {};
                    Object.keys(res.headers).forEach(k => {
                        headersObj[k.toLowerCase()] = res.headers[k];
                    });

                    resolve({
                        status: res.statusCode || 0,
                        headers: headersObj,
                        body: Buffer.concat(chunks).toString('utf8')
                    });
                });
            });

            req.on('timeout', () => {
                req.destroy(new Error('Connect Timeout Error (30s)'));
            });

            req.on('error', (err) => {
                console.error(`[Request Error] ${urlStr}: ${err.message}`);
                reject(err);
            });

            if (body) req.write(body);
            req.end();
        });
    }

    async login(email, password) {
        if (!email || !password) throw new Error('ایمیل و رمز عبور الزامی است');
        const store = new SimpleCookieStore();

        this.log(`شروع ورود برای کاربر: ${email}`);

        // 0. Visit login page for CSRF
        let r = await this.rawRequest(`${ORIGIN}/accounts/login/`, {
            method: 'GET',
            headers: { 'User-Agent': this.UA, 'Accept': 'text/html' }
        });
        store.applySetCookie(r.headers['set-cookie']);
        let csrf = store.get('csrftoken');

        if (!csrf) {
            const r2 = await this.rawRequest(`${ORIGIN}/api/v1/general/core-data/?profile=1`, {
                method: 'GET',
                headers: { 'User-Agent': this.UA, 'Accept': 'application/json' }
            });
            store.applySetCookie(r2.headers['set-cookie']);
            try { const j2 = JSON.parse(r2.body); csrf = j2?.auth?.csrf; } catch { }
            if (!csrf) csrf = store.get('csrftoken');
        }

        if (!csrf) throw new Error('خطا در دریافت توکن CSRF');

        const baseHeaders = () => ({
            'User-Agent': this.UA,
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrf,
            'Origin': ORIGIN,
            'Referer': `${ORIGIN}/accounts/login/`
        });

        // 1. check-active-user
        const formCheck = new URLSearchParams();
        formCheck.append('csrfmiddlewaretoken', csrf);
        formCheck.append('tessera', email);
        formCheck.append('g-recaptcha-response', '');

        r = await this.rawRequest(`${ORIGIN}/api/v1/auth/check-active-user`, {
            method: 'POST',
            headers: {
                ...baseHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': store.headerString()
            },
            body: formCheck.toString()
        });
        store.applySetCookie(r.headers['set-cookie']);
        let jCheck;
        try {
            jCheck = JSON.parse(r.body);
        } catch (e) {
            throw new Error('خطا در پاسخ سرور (تست یوزر فعال)');
        }

        if (jCheck.status !== 'success' || jCheck.message !== 'get-pass') {
            throw new Error(`خطای ورود: ${jCheck.message || 'وضعیت نامعتبر'}`);
        }

        // 2. login-authentication
        const formLogin = new URLSearchParams();
        formLogin.append('csrfmiddlewaretoken', csrf);
        formLogin.append('tessera', email);
        formLogin.append('hidden_username', email);
        formLogin.append('password', password);
        formLogin.append('g-recaptcha-response', '');

        r = await this.rawRequest(`${ORIGIN}/api/v1/auth/login-authentication`, {
            method: 'POST',
            headers: {
                ...baseHeaders(),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': store.headerString()
            },
            body: formLogin.toString()
        });
        store.applySetCookie(r.headers['set-cookie']);
        let jLogin;
        try {
            jLogin = JSON.parse(r.body);
        } catch (e) {
            throw new Error('خطا در پاسخ سرور (احراز هویت)');
        }

        if (jLogin.status !== 'success') throw new Error(jLogin.message || 'رمز عبور اشتباه است یا خطایی رخ داده است');

        const sessionid = store.get('sessionid');
        const finalCsrf = store.get('csrftoken') || csrf;
        if (!sessionid) throw new Error('کوکی نشست یافت نشد');

        this.activeCookie = `csrftoken=${finalCsrf}; sessionid=${sessionid}`;
        this.log('ورود با موفقیت انجام شد');
        return { success: true, cookie: this.activeCookie };
    }

    async fetchProfile() {
        if (!this.activeCookie) return null;
        try {
            const res = await this.rawRequest(`${ORIGIN}/api/v1/general/core-data/?profile=1`, {
                method: 'GET',
                headers: this.commonHeaders(ORIGIN)
            });
            if (res.status !== 200) return null;
            const data = JSON.parse(res.body);
            return {
                isAuthenticated: !!data?.auth?.details?.is_authenticated,
                email: data?.auth?.details?.email || data?.profile?.details?.email || '-',
                userId: data?.auth?.details?.user_id || '-',
                hasSubscription: !!data?.auth?.conditions?.has_subscription,
                hasCoursePurchase: !!data?.auth?.conditions?.has_course_purchase,
                firstName: data?.profile?.details?.first_name || '',
                lastName: data?.profile?.details?.last_name || '',
                fullname: (data?.profile?.details?.first_name || '') + ' ' + (data?.profile?.details?.last_name || '')
            };
        } catch (e) {
            console.error('Fetch Profile Error:', e);
            return null;
        }
    }

    async fetchChapters(courseSlug, referer) {
        const apiUrl = `${ORIGIN}/api/v1/courses/${courseSlug}/chapters/`;
        const res = await this.rawRequest(apiUrl, {
            method: 'GET',
            headers: { ...this.commonHeaders(referer), 'accept': 'application/json' }
        });

        if (res.status !== 200) throw new Error(`خطا در دریافت لیست فصل‌ها: ${res.status}`);

        const data = JSON.parse(res.body);
        const chapters = Array.isArray(data?.chapters) ? data.chapters : [];

        let courseTitle = data?.course_title || data?.title;
        if (!courseTitle) {
            try {
                courseTitle = decodeURIComponent(courseSlug).replace(/-/g, ' ');
            } catch {
                courseTitle = courseSlug.replace(/-/g, ' ');
            }
        }

        return {
            title: courseTitle,
            chapters: chapters.map(ch => ({
                ...ch,
                // Filter out non-video units like Quiz and Project
                units: (Array.isArray(ch.unit_set) ? ch.unit_set : []).filter(unit => {
                    const title = unit.title || '';
                    return !title.includes('کوئیز') && !title.includes('پروژه');
                })
            }))
        };
    }

    decodeHtmlEntities(str) {
        if (!str) return str;
        return str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;|&apos;/g, "'")
            .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
            .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
    }

    extractVideoSources(html) {
        const urls = [];
        // Pattern 1: <source src="...">
        const reSource = /<source\b[^>]*?src=["']([^"'>]+)["'][^>]*>/gim;
        let m;
        while ((m = reSource.exec(html)) !== null) {
            const url = this.decodeHtmlEntities(m[1]);
            if (url && url.includes('/videos/')) urls.push(url);
        }

        // Pattern 2: <a download href="...">
        const reAnchor = /<a\b[^>]*?href=["']([^"'>]+\.mp4[^"'>]*)["'][^>]*download[^>]*>/gim;
        while ((m = reAnchor.exec(html)) !== null) {
            const url = this.decodeHtmlEntities(m[1]);
            if (url && url.includes('/videos/')) urls.push(url);
        }

        return Array.from(new Set(urls));
    }

    extractAttachmentLinks(html) {
        const results = new Set();
        if (!html) return [];
        // Regex to capture <div class="...unit-content--download..."> ... <a href="..."> inside
        const blockRe = /<div[^>]*class=["'][^"'>]*unit-content--download[^"'>]*["'][^>]*>[\s\S]*?<\/div>/gim;
        let m;
        while ((m = blockRe.exec(html)) !== null) {
            const block = m[0];
            const aRe = /<a[^>]+href=["']([^"'>]+)["'][^>]*>/gim;
            let a;
            while ((a = aRe.exec(block)) !== null) {
                const url = this.decodeHtmlEntities(a[1]);
                if (url && /attachments/i.test(url)) {
                    results.add(url);
                }
            }
        }
        return Array.from(results);
    }

    extractSubtitleLinks(html) {
        const results = new Set();
        if (!html) return [];
        const re = /<track\b[^>]*?src=["']([^"'>]+)["'][^>]*>/gim;
        let m;
        while ((m = re.exec(html)) !== null) {
            const url = this.decodeHtmlEntities(m[1]);
            if (url) results.add(url);
        }
        return Array.from(results);
    }

    pickBestSource(urls, preferredQuality = '720') {
        if (!urls || urls.length === 0) return null;

        // 1. Try exact quality match first (e.g., /videos/hq720/ or /videos/hq_720/)
        const qualityPatterns = [
            new RegExp(`/videos/hq${preferredQuality}[/.]`),  // hq720/
            new RegExp(`/videos/hq_${preferredQuality}[/.]`), // hq_720/
            new RegExp(`/videos/hq${preferredQuality}`),      // hq720 (end of path segment)
            new RegExp(`/videos/hq_${preferredQuality}`),     // hq_720 (end of path segment)
        ];

        for (const pattern of qualityPatterns) {
            const match = urls.find(u => pattern.test(u));
            if (match) return match;
        }

        // 2. Fallback: any HQ source (better than nothing)
        const hq = urls.find(u => /\/videos\/hq\d+/.test(u) || u.includes('/videos/hq'));
        if (hq) return hq;

        // 3. Final fallback: first available URL
        return urls[0];
    }
    async downloadToFile(url, filePath, referer, sampleBytes = 0, speedLimitKB = 0, externalSignal = null) {
        const controller = new AbortController();
        const signal = externalSignal || controller.signal;
        const gate = new Gate();

        this.activeDownloads.set(filePath, { controller, gate });

        try {
            const tmpPath = filePath + '.part';
            let resumeOffset = 0;
            let existingFinalSize = 0;

            // Check if final file exists
            try {
                const stat = fs.statSync(filePath);
                existingFinalSize = stat.size;
            } catch { }

            let remoteTotal = 0;
            let acceptRanges = false;
            if (sampleBytes === 0) {
                try {
                    const resHead = await this.fetchWithRetry(url, { method: 'HEAD', headers: this.commonHeaders(referer) }, 3, 1000);
                    if (resHead.ok) {
                        remoteTotal = parseInt(resHead.headers.get('content-length') || '0', 10);
                        acceptRanges = resHead.headers.get('accept-ranges') === 'bytes';

                        if (existingFinalSize > 0 && remoteTotal > 0 && existingFinalSize >= remoteTotal) {
                            return 'exists';
                        }
                    }
                } catch (e) {
                    console.warn(`[Remote Size Check Fail] ${e.message}`);
                }
            }

            // Decide resume offset
            resumeOffset = 0;
            try {
                if (fs.existsSync(tmpPath)) {
                    resumeOffset = fs.statSync(tmpPath).size;
                } else if (existingFinalSize > 0 && sampleBytes === 0) {
                    // Final file exists but is incomplete (otherwise we would have returned 'exists' above)
                    // If server supports ranges, rename to .part and resume
                    if (acceptRanges) {
                        this.log(`فایل موجود ناقص است (${this.formatBytes(existingFinalSize)} / ${this.formatBytes(remoteTotal)}). در حال ادامه دانلود...`, 'info');
                        await fs.promises.rename(filePath, tmpPath);
                        resumeOffset = existingFinalSize;
                    } else {
                        this.log(`فایل موجود ناقص است اما سرور از ادامه دانلود پشتیبانی نمی‌کند. شروع مجدد...`, 'warn');
                        resumeOffset = 0;
                    }
                }
            } catch { }

            const requestInit = {
                method: 'GET',
                headers: {
                    ...this.commonHeaders(referer),
                    accept: 'video/mp4,application/octet-stream,*/*'
                }
            };

            if (sampleBytes > 0) {
                requestInit.headers['range'] = `bytes=0-${sampleBytes - 1}`;
                resumeOffset = 0;
            } else if (resumeOffset > 0) {
                requestInit.headers['range'] = `bytes=${resumeOffset}-`;
            }

            // Perform request using https.request for stream stability
            const u = new URL(url);
            const res = await new Promise((resolve, reject) => {
                const opts = {
                    method: 'GET',
                    hostname: u.hostname,
                    path: u.pathname + (u.search || ''),
                    protocol: u.protocol,
                    headers: requestInit.headers,
                    timeout: 45000 // 45s connect timeout
                };

                const req = https.request(opts, (res) => {
                    if (res.statusCode >= 400) {
                        reject(new Error(`HTTP ${res.statusCode}`));
                        return;
                    }
                    resolve(res);
                });

                req.on('timeout', () => {
                    req.destroy(new Error('Connect Timeout Error (45s)'));
                });

                req.on('error', reject);
                req.end();
            });

            // If server didn't honor range, restart
            let finalResumeOffset = resumeOffset;
            if (resumeOffset > 0 && res.statusCode !== 206) {
                this.log(`سرور از دانلود تکه‌ای سر باز زد. شروع مجدد...`, 'warn');
                try { await fs.promises.unlink(tmpPath); } catch { }
                finalResumeOffset = 0;
            }

            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
            const write = fs.createWriteStream(tmpPath, { flags: finalResumeOffset > 0 ? 'a' : 'w' });

            // res is already a readable stream in https.request
            const readable = res;

            // Robust total size calculation from Content-Range
            let expectedTotal = 0;
            const contentRange = res.headers['content-range'];
            const crMatch = contentRange && contentRange.match(/\/(\d+)$/);
            const fullLength = res.headers['content-length'] ? parseInt(res.headers['content-length']) : 0;

            if (sampleBytes > 0) expectedTotal = sampleBytes;
            else if (crMatch) expectedTotal = parseInt(crMatch[1], 10);
            else if (fullLength && finalResumeOffset > 0) expectedTotal = finalResumeOffset + fullLength;
            else expectedTotal = fullLength;

            let downloaded = finalResumeOffset;

            const counter = new Transform({
                transform(chunk, enc, cb) {
                    downloaded += chunk.length;
                    this.emit('progress', { downloaded, total: expectedTotal });
                    cb(null, chunk);
                }
            });

            counter.on('progress', (p) => {
                this.sendToUI('download-progress', { url, filePath, ...p });
            });

            const throttler = new Throttle(speedLimitKB * 1024);

            await pipeline(readable, gate, counter, throttler, write, { signal });
            await fs.promises.rename(tmpPath, filePath);
            return 'downloaded';
        } finally {
            this.activeDownloads.delete(filePath);
        }
    }

    cancelDownload(filePath) {
        const item = this.activeDownloads.get(filePath);
        if (item) {
            item.controller.abort();
            this.activeDownloads.delete(filePath);
            return true;
        }
        return false;
    }

    pauseDownload(filePath) {
        const item = this.activeDownloads.get(filePath);
        if (item) {
            // Abort connection to free up worker
            item.controller.abort();
            this.activeDownloads.delete(filePath);
            return true;
        }
        return false;
    }

    resumeDownload(filePath) {
        // Resume is handled by re-adding to queue in main process
        return true;
    }
    async getLectureHtml(url, referer, retry = true) {
        const res = await this.rawRequest(url, {
            method: 'GET',
            headers: this.commonHeaders(referer)
        });

        if (res.status === 403 || res.status === 401) {
            // Session might be expired
            if (retry) {
                this.log('نشست کاربری منقضی شده است. در حال تلاش برای ورود مجدد...', 'warn');
                // Attempt to refresh cookie from session file
                if (!this.sessionFilePath) throw new Error('مسیر فایل نشست تنظیم نشده است.');
                try {
                    const sessions = await fs.promises.readFile(this.sessionFilePath, 'utf8').then(JSON.parse).catch(() => null);
                    if (sessions && sessions.lastUsed && sessions.users[sessions.lastUsed]) {
                        // In a real scenario, we might need to re-login with password
                        // But here, we just check if we can update the cookie or if the stored cookie is actually old.
                        // Since we don't store passwords effectively for auto-relogin without user interaction usually,
                        // we can try to reload the cookie from the store in case another window updated it.
                        // OR, if we assume the cookie IS the session, we can't do much without a refresh token or password.

                        // BUT, for Maktabkhooneh, usually the cookie lasts long.
                        // If it's 403, it might be a temporary IP ban or cookie invalidation.

                        // Auto-relogin with saved password
                        const user = sessions.users[sessions.lastUsed];
                        if (user && user.auth) {
                            try {
                                const pass = Buffer.from(user.auth, 'base64').toString('utf8');
                                this.log(`در حال ورود خودکار با اکانت ${sessions.lastUsed}...`, 'info');

                                // Perform fresh login
                                const loginRes = await this.login(sessions.lastUsed, pass);

                                if (loginRes.success && loginRes.cookie) {
                                    this.log('ورود خودکار موفقیت‌آمیز بود.', 'success');
                                    this.setCookie(loginRes.cookie);

                                    // Update session file with new cookie
                                    user.cookie = loginRes.cookie;
                                    user.updated = new Date().toISOString();
                                    await fs.promises.writeFile(this.sessionFilePath, JSON.stringify(sessions, null, 2), 'utf8');

                                    return this.getLectureHtml(url, referer, false); // Retry with new cookie
                                }
                            } catch (loginErr) {
                                console.error('Auto-login failed:', loginErr);
                                this.log(`ورود خودکار ناموفق بود: ${loginErr.message}`, 'error');
                            }
                        }
                    }
                } catch (e) { console.error('Auto-relogin error:', e); }

                throw new Error(`خطا در دسترسی به محتوا (403). ورود خودکار ناموفق بود.`);
            }
        }

        if (res.status !== 200) throw new Error(`خطا در دسترسی به محتوا: ${res.status}`);
        return res.body;
    }

    sanitizeName(name) {
        return name.replace(/[\/:*?"<>|]/g, ' ').replace(/[\s\u200c\u200f\u202a\u202b]+/g, ' ').trim();
    }

    buildLectureUrl(courseSlug, chapter, unit) {
        // Slugs might come in encoded or raw. Decode first to be sure, then encode once for the URL.
        const cleanCourse = decodeURIComponent(courseSlug);
        const cleanChapter = decodeURIComponent(chapter.slug);
        const cleanUnit = decodeURIComponent(unit.slug);

        const chapterSegment = `${encodeURIComponent(cleanChapter)}-ch${chapter.id}`;
        const unitSegment = encodeURIComponent(cleanUnit);
        return `${ORIGIN}/course/${encodeURIComponent(cleanCourse)}/${chapterSegment}/${unitSegment}/`;
    }
}

export default Downloader;

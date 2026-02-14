import '../assets/css/main.css'

const app = document.getElementById('app');

const ICONS = {
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    login: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`,
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    back: '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>',
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    terminal: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>',
    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88 3.59 3.59"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M8.61 8.61a3 3 0 0 0 4.19 4.19"/><path d="m17.39 17.39 3.02 3.02"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11.73 3 5.6 9.4a2 2 0 0 1-1.7 2.9h-11.2a2 2 0 0 1-1.7-2.9l5.6-9.4a2 2 0 0 1 3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    minus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    grip: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    addUser: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    switchUser: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>`
};

const ToastManager = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    lastMessage: null,
    lastTime: 0,

    show(message, type = 'info', duration = 4000) {
        // Prevent spamming identical messages within 2 seconds
        if (this.lastMessage === message && Date.now() - this.lastTime < 2000) return;
        this.lastMessage = message;
        this.lastTime = Date.now();

        this.init();
        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;

        const icon = type === 'success' ? ICONS.check :
            type === 'error' ? ICONS.close :
                type === 'warn' ? ICONS.alert : ICONS.info;

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="flex-1">
                <p class="text-sm font-black text-[var(--text-title)] mb-1 leading-snug">${message}</p>
                <div class="toast-progress" style="width: 100%"></div>
            </div>
        `;

        this.container.appendChild(toast);

        // Progress bar animation
        const progress = toast.querySelector('.toast-progress');
        progress.style.transition = `width ${duration}ms linear`;
        setTimeout(() => progress.style.width = '0%', 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('exiting');
            setTimeout(() => toast.remove(), 600);
        }, duration);
    }
};

const ConfirmModal = {
    show(message, onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200';
        modal.innerHTML = `
            <div class="glass p-8 rounded-[2rem] max-w-sm w-full mx-4 shadow-2xl border border-[var(--border-subtle)] scale-95 animate-in zoom-in-95 duration-200">
                <div class="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto text-cyan-500">
                    ${ICONS.alert}
                </div>
                <h3 class="text-xl font-black text-center text-[var(--text-title)] mb-2">تایید عملیات</h3>
                <p class="text-center text-[var(--text-secondary)] text-sm mb-8 leading-relaxed">${message}</p>
                <div class="flex gap-3">
                    <button id="modalCancelBtn" class="flex-1 h-12 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold hover:bg-[var(--surface-2)] transition-all">انصراف</button>
                    <button id="modalConfirmBtn" class="flex-1 h-12 rounded-xl bg-cyan-500 text-slate-950 font-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all">بله، ادامه بده</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const close = () => {
            modal.classList.add('out', 'fade-out', 'zoom-out-95');
            setTimeout(() => modal.remove(), 200);
        };

        modal.querySelector('#modalCancelBtn').onclick = close;
        modal.querySelector('#modalConfirmBtn').onclick = () => {
            close();
            onConfirm();
        };
        modal.onclick = (e) => {
            if (e.target === modal) close();
        };
    }
};

let STATE = {
    courses: [],
    downloads: [],
    logs: [],
    currentView: 'login', // login, dashboard, chapters, downloads, about
    downloadTab: 'all', // all, active, finished, queued
    userProfile: null // { fullname, email, hasSubscription, ... }
};

function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'light') {
        html.classList.add('light-theme');
    } else if (theme === 'dark') {
        html.classList.remove('light-theme');
    } else {
        // Auto
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            html.classList.add('light-theme');
        } else {
            html.classList.remove('light-theme');
        }
    }
}

function applyFontSize(size) {
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.setProperty('--base-font-size', sizes[size] || '16px');
}

// Initialize Settings
const initSettings = () => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{"beep": true, "theme": "dark", "fontSize": "medium"}');
    applyTheme(settings.theme || 'dark');
    applyFontSize(settings.fontSize || 'medium');
};
initSettings();

async function renderLogin() {
    STATE.currentView = 'login';
    const saved = JSON.parse(localStorage.getItem('rememberedCredentials') || 'null');
    const savedAccounts = await window.electron.ipcRenderer.invoke('get-saved-accounts');

    app.className = "h-screen w-screen flex flex-col items-center justify-center login-bg transition-colors duration-500 overflow-y-auto py-10";
    app.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 items-start justify-center max-w-5xl w-full px-6">
            <!-- Saved Accounts Section (If Any) -->
            ${savedAccounts.length > 0 ? `
                <div class="glass p-8 rounded-[2.5rem] w-full md:w-80 animate-in fade-in slide-in-from-right-8 duration-700 border border-[var(--border-subtle)]">
                    <h3 class="text-lg font-black mb-6 text-[var(--text-title)] flex items-center gap-2">
                        ${ICONS.user}
                        نشست‌های ذخیره شده
                    </h3>
                    <div class="space-y-3">
                        ${savedAccounts.map(acc => `
                            <div class="group relative flex items-center justify-between p-3 rounded-2xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all cursor-pointer account-item" data-email="${acc.email}">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-sm font-black text-cyan-500 shadow-inner">
                                        ${acc.fullname[0].toUpperCase()}
                                    </div>
                                    <div class="min-w-0">
                                        <p class="font-black text-sm truncate">${acc.fullname}</p>
                                        <p class="text-[10px] text-[var(--text-secondary)] opacity-60 truncate">${acc.email}</p>
                                    </div>
                                </div>
                                <button class="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all delete-account-btn" data-email="${acc.email}">
                                    ${ICONS.close}
                                </button>
                                ${acc.isLastUsed ? `<div class="absolute top-2 left-2 w-2 h-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Main Login Card -->
            <div class="glass p-12 rounded-[3rem] max-w-md w-full animate-in fade-in zoom-in slide-in-from-bottom-8 duration-700 shadow-[0_32px_128px_rgba(0,0,0,0.5)] border border-[var(--border-subtle)] relative overflow-hidden">
                <div class="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full"></div>
                
                <div class="text-center mb-12 relative z-10">
                    <div class="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        ${ICONS.user}
                    </div>
                    <h1 class="text-4xl font-black mb-3 leading-tight tracking-tighter text-[var(--text-title)]">خوش آمدید</h1>
                    <p class="text-[var(--text-secondary)] text-sm font-bold opacity-60">جهت دسترسی به دوره‌های آموزشی وارد شوید</p>
                </div>
                
                <form id="loginForm" class="space-y-8 relative z-10">
                    <div class="space-y-3">
                        <label class="block text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mr-1">ایمیل یا شماره همراه</label>
                        <div class="login-input-group">
                            <div class="glow-effect"></div>
                            <div class="absolute inset-y-0 right-4 flex items-center text-[var(--text-secondary)] opacity-40 group-focus-within:text-cyan-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <input type="text" id="email" required value="${saved?.email || ''}" class="w-full theme-input rounded-2xl py-4.5 pr-12 pl-4 focus:outline-none focus:border-cyan-500/50 transition-all font-sans text-sm font-bold" placeholder="example@mail.com">
                        </div>
                    </div>

                    <div class="space-y-3">
                        <label class="block text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mr-1">رمز عبور</label>
                        <div class="login-input-group">
                            <div class="glow-effect"></div>
                            <div class="absolute inset-y-0 right-4 flex items-center text-[var(--text-secondary)] opacity-40 group-focus-within:text-cyan-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                            <input type="password" id="password" required value="${saved?.password || ''}" class="w-full theme-input rounded-2xl py-4.5 pr-12 pl-12 focus:outline-none focus:border-cyan-500/50 transition-all font-sans text-sm font-bold" placeholder="••••••••">
                            <button type="button" id="togglePassword" class="absolute inset-y-0 left-4 flex items-center text-[var(--text-secondary)] hover:text-cyan-500 transition-colors">
                                ${ICONS.eye}
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between px-1">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" id="rememberMe" class="sr-only peer" ${saved ? 'checked' : ''}>
                            <div class="w-5 h-5 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
                                ${ICONS.check}
                            </div>
                            <span class="text-xs font-bold text-[var(--text-secondary)] opacity-60 group-hover:opacity-100 transition-opacity">ذخیره اطلاعات ورود</span>
                        </label>
                    </div>

                    <button type="submit" id="loginBtn" class="w-full h-16 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-[1.25rem] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl shadow-cyan-500/20 group">
                        <span id="btnText">ورود به پنل کاربری</span>
                        <div id="btnIcon" class="group-hover:translate-x-[-4px] transition-transform">
                            ${ICONS.login}
                        </div>
                    </button>
                </form>
            </div>
        </div>

        <!-- Professional Footer -->
        <footer class="mt-12 flex items-center gap-8 opacity-90 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
            <a href="https://github.com/VeilVulp" target="_blank" class="login-footer-link">مستندات برنامه</a>
            <div class="w-1.5 h-1.5 rounded-full bg-white/10"></div>
            <a href="https://github.com/VeilVulp" target="_blank" class="login-footer-link">ارتباط با پشتیبانی</a>
            <div class="w-1.5 h-1.5 rounded-full bg-white/10"></div>
            <a href="https://github.com/VeilVulp" target="_blank" class="login-footer-link flex items-center gap-2">
                ${ICONS.github}
                گیت‌هاب
            </a>
        </footer>
    `;

    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');

    toggleBtn?.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.innerHTML = isPassword ? ICONS.eyeOff : ICONS.eye;
    });

    // Handle session switching
    document.querySelectorAll('.account-item').forEach(item => {
        item.addEventListener('click', async (e) => {
            if (e.target.closest('.delete-account-btn')) return;
            const email = item.dataset.email;
            const res = await window.electron.ipcRenderer.invoke('switch-account', { email });
            if (res.success) {
                ToastManager.show(`در حال ورود با حساب ${email}...`, 'info');
                renderDashboard();
            } else {
                ToastManager.show(res.error, 'error');
            }
        });
    });

    // Handle session deletion
    document.querySelectorAll('.delete-account-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const email = btn.dataset.email;
            await window.electron.ipcRenderer.invoke('logout', { email });
            renderLogin(); // Refresh view
        });
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const btn = document.getElementById('loginBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');

        // Loading State
        btn.disabled = true;
        const originalIcon = btnIcon.innerHTML;
        btnText.innerText = 'درحال احراز هویت...';
        btnIcon.innerHTML = '<div class="loading-spinner"></div>';

        try {
            const result = await window.electron.ipcRenderer.invoke('login', { email, password });
            if (result.success) {
                if (rememberMe) {
                    localStorage.setItem('rememberedCredentials', JSON.stringify({ email, password }));
                } else {
                    localStorage.removeItem('rememberedCredentials');
                }
                ToastManager.show('خوش آمدید! ورود با موفقیت انجام شد.', 'success');
                renderDashboard();
            } else {
                ToastManager.show('خطا: ' + result.error, 'error');
                resetBtn();
            }
        } catch (err) {
            ToastManager.show('خطای سیستمی در برقراری ارتباط', 'error');
            resetBtn();
        }

        function resetBtn() {
            btn.disabled = false;
            btnText.innerText = 'ورود به پنل کاربری';
            btnIcon.innerHTML = originalIcon;
        }
    });
}

function renderDashboard() {
    STATE.currentView = 'dashboard';
    app.className = "h-screen w-screen flex overflow-hidden transition-colors duration-300";
    app.innerHTML = `
        <aside class="w-72 bg-[var(--surface-1)] border-l border-[var(--border-subtle)] backdrop-blur-xl flex flex-col p-6 shadow-2xl">
            <div class="flex items-center gap-3 mb-10 px-2">
                <div class="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    ${ICONS.download}
                </div>
                <h2 class="text-xl font-black text-[var(--text-title)]">دانلودر حرفه‌ای</h2>
            </div>

            <nav class="flex-1 space-y-2">
                <button id="navDashboard" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all">
                    ${ICONS.dashboard}
                    <span class="font-bold">داشبورد</span>
                </button>
                <button id="navDownloads" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all">
                    ${ICONS.download}
                    <span class="font-bold">مدیریت دانلودها</span>
                </button>
                <button id="navSettings" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-[var(--text-secondary)] hover:bg-[var(--surface-2)]">
                    ${ICONS.settings}
                    <span class="font-bold">تنظیمات</span>
                </button>
                <button id="navAbout" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-[var(--text-secondary)] hover:bg-[var(--surface-2)]">
                    ${ICONS.info}
                    <span class="font-bold">درباره من</span>
                </button>
            </nav>

            <!-- Profile Card with Hover Menu -->
            <div class="profile-card-wrapper">
                <div class="account-hover-menu" id="accountHoverMenu">
                    <div class="menu-section-label">حساب‌های ذخیره شده</div>
                    <div id="accountMenuList"></div>
                    <div class="menu-divider"></div>
                    <button class="add-account-btn" id="addAccountBtn">
                        <div class="add-icon">${ICONS.addUser}</div>
                        <span>افزودن اکانت جدید</span>
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-logout-btn" id="menuLogoutBtn">
                        <div class="logout-icon">${ICONS.logout}</div>
                        <span>خروج از حساب فعلی</span>
                    </button>
                </div>
                <div class="p-4 glass rounded-[1.5rem] group transition-all cursor-pointer" id="userProfileCard">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3 overflow-hidden">
                            <div id="profileAvatar" class="w-10 h-10 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center text-sm font-black text-cyan-500 shadow-inner">U</div>
                            <div class="min-w-0">
                                <p id="profileName" class="text-[11px] font-black text-[var(--text-title)] truncate">در حال دریافت...</p>
                                <p id="profileEmail" class="text-[9px] text-[var(--text-secondary)] opacity-50 truncate">...</p>
                                <p id="profileStatus" class="text-[9px] text-[var(--text-secondary)] font-bold opacity-60">صبر کنید...</p>
                            </div>
                        </div>
                        <div class="text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-opacity">
                            ${ICONS.chevronDown}
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 flex flex-col min-w-0">
            <header id="dynamicHeader" class="island-header">
                <div class="island-header-right">
                    <h2 id="sectionTitle">داشبورد دوره‌ها</h2>
                    <p id="sectionSubtitle">مدیریت و دریافت هوشمند محتوا</p>
                </div>
                <div class="island-header-left">
                    <span class="welcome-text" id="welcomeMsg">سلام! <span class="welcome-name">خوش آمدید</span></span>
                </div>
            </header>
            <div id="mainContent" class="flex-1 flex flex-col min-w-0 overflow-hidden"></div>
        </main>
    `;

    document.getElementById('navDashboard').addEventListener('click', () => {
        updateNav('navDashboard');
        renderDashboardContent();
    });
    document.getElementById('navDownloads').addEventListener('click', () => {
        updateNav('navDownloads');
        renderDownloadsContent();
    });
    document.getElementById('navSettings').addEventListener('click', () => {
        updateNav('navSettings');
        renderSettingsContent();
    });
    document.getElementById('navAbout').addEventListener('click', () => {
        updateNav('navAbout');
        renderAboutContent();
    });

    // Account hover menu buttons
    document.getElementById('addAccountBtn')?.addEventListener('click', () => {
        renderLogin();
    });

    document.getElementById('menuLogoutBtn')?.addEventListener('click', async () => {
        if (STATE.userProfile?.email) {
            await window.electron.ipcRenderer.invoke('logout', { email: STATE.userProfile.email });
        }
        STATE.userProfile = null;
        renderLogin();
    });

    // Fetch and Update Profile Info
    updateUserProfileUI();
    refreshAccountMenu();

    updateNav('navDashboard');
    renderDashboardContent();
}

async function updateUserProfileUI() {
    try {
        const profile = await window.electron.ipcRenderer.invoke('get-user-profile');
        if (!profile) return;

        // Save to global state
        STATE.userProfile = profile;

        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmail');
        const statusEl = document.getElementById('profileStatus');
        const avatarEl = document.getElementById('profileAvatar');
        const welcomeEl = document.getElementById('welcomeMsg');

        const displayName = profile.fullname?.trim() || profile.email.split('@')[0];

        if (nameEl) nameEl.textContent = displayName;
        if (emailEl) emailEl.textContent = profile.email || '';
        if (statusEl) {
            if (profile.hasSubscription) {
                statusEl.textContent = 'اشتراک فعال';
                statusEl.className = 'text-[9px] font-bold text-green-400';
            } else if (profile.hasCoursePurchase) {
                statusEl.textContent = 'خرید دوره‌ای';
                statusEl.className = 'text-[9px] font-bold text-cyan-400';
            } else {
                statusEl.textContent = 'کاربر عادی';
                statusEl.className = 'text-[9px] font-bold text-[var(--text-secondary)] opacity-60';
            }
        }
        if (avatarEl) avatarEl.textContent = (displayName)[0].toUpperCase();

        // Update island header welcome message
        if (welcomeEl) {
            welcomeEl.innerHTML = `سلام، <span class="welcome-name">${displayName}</span>! خوش آمدید`;
        }
    } catch (e) {
        console.error('UI Profile Update Error:', e);
    }
}

function updateSectionHeader(title, subtitle) {
    const titleEl = document.getElementById('sectionTitle');
    const subtitleEl = document.getElementById('sectionSubtitle');
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
}

async function refreshAccountMenu() {
    try {
        const accounts = await window.electron.ipcRenderer.invoke('get-saved-accounts');
        const listEl = document.getElementById('accountMenuList');
        if (!listEl) return;

        if (accounts.length === 0) {
            listEl.innerHTML = `<div class="text-center text-[var(--text-secondary)] text-[0.6rem] opacity-40 py-3 font-bold">حسابی ذخیره نشده</div>`;
            return;
        }

        listEl.innerHTML = accounts.map(acc => `
            <div class="saved-account-item ${acc.isLastUsed ? 'is-active' : ''}" data-email="${acc.email}">
                <div class="account-avatar">${(acc.fullname || acc.email)[0].toUpperCase()}</div>
                <div class="account-info">
                    <div class="account-name">${acc.fullname || acc.email.split('@')[0]}</div>
                    <div class="account-email">${acc.email}</div>
                </div>
                ${acc.isLastUsed ? '<div class="active-dot"></div>' : ''}
            </div>
        `).join('');

        // Attach switch listeners
        listEl.querySelectorAll('.saved-account-item').forEach(item => {
            item.addEventListener('click', async () => {
                const email = item.dataset.email;
                const res = await window.electron.ipcRenderer.invoke('switch-account', { email });
                if (res.success) {
                    ToastManager.show(`سوئیچ به حساب ${email} با موفقیت انجام شد`, 'success');
                    await updateUserProfileUI();
                    await refreshAccountMenu();
                } else {
                    ToastManager.show(res.error || 'خطا در تغییر حساب', 'error');
                }
            });
        });
    } catch (e) {
        console.error('Refresh Account Menu Error:', e);
    }
}

function updateNav(activeId) {
    document.querySelectorAll('.nav-item').forEach(btn => {
        if (btn.id === activeId) {
            btn.classList.add('text-cyan-500', 'bg-cyan-500/10');
            btn.classList.remove('text-[var(--text-secondary)]', 'hover:bg-[var(--surface-2)]');
        } else {
            btn.classList.remove('text-cyan-500', 'bg-cyan-500/10');
            btn.classList.add('text-[var(--text-secondary)]', 'hover:bg-[var(--surface-2)]');
        }
    });
}

function renderDashboardContent() {
    STATE.currentView = 'dashboard';
    updateSectionHeader('داشبورد دوره‌ها', 'مدیریت و دریافت هوشمند محتوای مکتب‌خونه');
    const container = document.getElementById('mainContent');
    container.innerHTML = `
        <header class="p-8 pb-6 border-b border-[var(--border-subtle)] bg-[var(--surface-1)]">
            
            <div class="flex flex-col md:flex-row gap-4 mb-10 w-full">
                <div class="relative group flex-1">
                    <div class="absolute inset-y-0 right-4 flex items-center text-cyan-500 opacity-40 group-focus-within:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </div>
                    <input type="text" id="courseUrl" class="w-full rounded-2xl py-4 pr-12 pl-4 focus:outline-none transition-all font-sans text-sm theme-input bg-[var(--surface-2)] shadow-inner" placeholder="لینک دوره را اینجا وارد کنید...">
                </div>
                <button id="addCourseBtn" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-12 py-4 rounded-2xl transition-all shadow-xl shadow-cyan-500/20 active:scale-95 whitespace-nowrap text-base md:w-auto w-full">
                    تحلیل و افزودن دوره
                </button>
            </div>

            <div class="flex items-center gap-6 pt-6 border-t border-[var(--border-subtle)]/50">
                <div class="relative flex-1 max-w-md">
                    <div class="absolute inset-y-0 right-4 flex items-center text-[var(--text-secondary)] opacity-50">
                        ${ICONS.search}
                    </div>
                    <input type="text" id="dashboardSearch" class="w-full rounded-xl py-3 pr-11 pl-4 text-xs focus:outline-none transition-all theme-input bg-[var(--surface-2)]" placeholder="جستجو در آرشیو دوره‌ها...">
                </div>
                <div class="h-6 w-px bg-[var(--border-subtle)] opacity-20"></div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] opacity-40">آرشیو دوره‌ها</span>
                    <span class="bg-cyan-500/10 text-cyan-500 text-[10px] font-black px-2 py-0.5 rounded-md border border-cyan-500/20">${STATE.courses.length} دوره</span>
                </div>
            </div>
        </header>

        <section class="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar pt-6">
            <div class="flex flex-col gap-5 max-w-6xl mx-auto pb-8" id="courseGrid">
                ${STATE.courses.length === 0 ? `
                    <div class="glass p-12 rounded-[2.5rem] border-dashed border-[var(--border-subtle)] flex flex-col items-center justify-center text-center opacity-40 h-80 col-span-full">
                        <div class="w-20 h-20 bg-[var(--surface-2)] rounded-[2rem] flex items-center justify-center mb-6 text-[var(--text-secondary)] rotate-3">
                            ${ICONS.search}
                        </div>
                        <h4 class="text-[var(--text-title)] font-black text-lg mb-2">هنوز دوره‌ای اضافه نشده است</h4>
                        <p class="text-[var(--text-secondary)] text-sm max-w-xs">برای شروع، لینک یکی از دوره‌های خود در مکتب‌خونه را در فیلد بالا وارد کنید</p>
                    </div>
                ` : STATE.courses.map(course => renderCourseCard(course)).join('')}
            </div>
        </section>
    `;


    const attachCourseListeners = (containerEl) => {
        containerEl.querySelectorAll('.view-chapters-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const course = STATE.courses.find(c => c.slug === btn.dataset.slug);
                renderChaptersView(course);
            });
        });

        containerEl.querySelectorAll('.download-all-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnEl = btn;
                if (btnEl.classList.contains('opacity-50')) return;

                const course = STATE.courses.find(c => c.slug === btnEl.dataset.slug);
                if (!course) return;

                // Select ALL units
                const allUnits = [];
                course.chapters.forEach((ch, chIdx) => {
                    ch.units.forEach(u => {
                        allUnits.push({
                            chapter: '' + chIdx, // Ensure string to match dataset usually
                            slug: u.slug,
                            title: u.title
                        });
                    });
                });

                if (allUnits.length === 0) return ToastManager.show('این دوره محتوای قابل دانلود ندارد', 'warn');

                ConfirmModal.show(`آیا از شروع دانلود ${allUnits.length} فایل برای دوره «${course.title}» اطمینان دارید؟`, async () => {
                    btnEl.classList.add('opacity-50', 'pointer-events-none');
                    btnEl.innerHTML = `<span>در حال پردازش...</span>`;

                    try {
                        const settings = JSON.parse(localStorage.getItem('userSettings') || '{"quality": "720", "path": "", "concurrency": 1, "speedLimit": 0, "beep": true}');

                        const existingTitles = await window.electron.ipcRenderer.invoke('check-existing-units', {
                            courseSlug: course.slug,
                            selectedUnits: allUnits,
                            quality: settings.quality,
                            customPath: settings.path
                        });

                        let unitsToDownload = allUnits;
                        if (existingTitles.length > 0) {
                            unitsToDownload = allUnits.filter(s => !existingTitles.includes(s.title));
                            if (unitsToDownload.length === 0) {
                                ToastManager.show('تمامی فایل‌های این دوره از قبل موجود هستند.', 'success');
                                btnEl.classList.remove('opacity-50', 'pointer-events-none');
                                btnEl.innerHTML = `<span>دانلود یکجا</span> ${ICONS.download}`;
                                return;
                            }
                            ToastManager.show(`${existingTitles.length} فایل از قبل موجود است و نادیده گرفته شد.`, 'info');
                        }

                        // Pre-populate downloads list
                        STATE.downloads = unitsToDownload.map(item => ({
                            fileName: item.title,
                            unitSlug: item.slug,
                            chapter: item.chapter,
                            progress: 0,
                            status: 'queued'
                        }));

                        updateNav('navDownloads');
                        renderDownloadsContent();

                        await window.electron.ipcRenderer.invoke('start-download', {
                            courseSlug: course.slug,
                            selectedUnits: unitsToDownload,
                            quality: settings.quality,
                            customPath: settings.path,
                            concurrency: settings.concurrency,
                            speedLimit: settings.speedLimit
                        });

                    } catch (err) {
                        console.error('Download All error:', err);
                        ToastManager.show('خطا در شروع دانلود', 'error');
                    } finally {
                        // Even if we navigate away, resetting state is good practice
                        btnEl.classList.remove('opacity-50', 'pointer-events-none');
                    }
                });
            });
        });
    };

    document.getElementById('dashboardSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const grid = document.getElementById('courseGrid');
        const filtered = STATE.courses.filter(c => c.title.toLowerCase().includes(term));
        grid.innerHTML = filtered.length > 0 ? filtered.map(c => renderCourseCard(c)).join('') : `
            <div class="col-span-full py-20 text-center opacity-30">
                <p class="font-black text-lg">نتیجه‌ای یافت نشد</p>
            </div>
        `;
        // Re-attach listeners after filter
        attachCourseListeners(grid);
    });

    document.getElementById('addCourseBtn').addEventListener('click', async () => {
        const urlInput = document.getElementById('courseUrl');
        const url = urlInput.value.trim();
        if (!url) return;

        let slug = '';
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            const idx = pathParts.indexOf('course');
            if (idx !== -1 && pathParts[idx + 1]) slug = pathParts[idx + 1];
            else throw new Error();
        } catch (e) {
            ToastManager.show('لینک دوره معتبر نیست. مثال: https://maktabkhooneh.org/course/slug', 'warn');
            return;
        }

        const btn = document.getElementById('addCourseBtn');
        btn.classList.add('btn-loading');

        // Add skeleton
        const grid = document.getElementById('courseGrid');
        const skeleton = document.createElement('div');
        skeleton.className = "skeleton h-80 rounded-[2.5rem]";
        if (STATE.courses.length === 0) grid.innerHTML = '';
        grid.prepend(skeleton);

        try {
            const data = await window.electron.ipcRenderer.invoke('fetch-chapters', { courseSlug: slug });
            if (data.error) {
                ToastManager.show('خطا در دریافت اطلاعات دوره: ' + data.error, 'error');
                skeleton.remove();
                if (STATE.courses.length === 0) renderDashboardContent();
                btn.classList.remove('btn-loading');
            } else {
                btn.classList.remove('btn-loading');
                STATE.courses.unshift({
                    slug,
                    title: data.title,
                    chapters: data.chapters
                });
                ToastManager.show(`دوره "${data.title}" با موفقیت تحلیل و اضافه شد.`, 'success');
                renderDashboardContent();
            }
        } catch (err) {
            ToastManager.show('خطا در تحلیل دوره. لطفا دوباره تلاش کنید.', 'error');
            console.error(err);
            skeleton.remove();
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'تحلیل دوره';
        }
    });

    // Initial attach
    attachCourseListeners(container);
}

function renderCourseCard(course) {
    return `
        <div class="premium-card p-4 flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-4 duration-700 group">
            <!-- Left: Thumbnail/Icon Section -->
            <div class="w-full md:w-32 h-20 md:h-24 bg-[var(--surface-2)] rounded-2xl overflow-hidden relative shrink-0">
                <div class="absolute inset-0 flex items-center justify-center text-cyan-500/40">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 premium-card-zoom" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <!-- Center: Info Section -->
            <div class="flex-1 min-w-0">
                <h3 class="text-premium-title mb-1 text-[var(--text-title)] truncate group-hover:text-cyan-500 transition-colors" title="${course.title}">${course.title}</h3>
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_var(--accent-glow)]"></span>
                        <span class="text-premium-meta text-cyan-500/80 font-black">${course.chapters.length} فصل تدوین شده</span>
                    </div>
                    <span class="text-[10px] text-[var(--text-secondary)] opacity-40 uppercase tracking-tighter">آخرین بروزرسانی: ${new Date().toLocaleDateString('fa-IR')}</span>
                </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-3 w-full md:w-auto">
                <button class="view-chapters-btn h-12 flex-1 md:flex-none md:min-w-[160px] bg-[var(--surface-2)] hover:bg-[var(--btn-ghost-hover-bg)] text-[var(--text-primary)] font-black rounded-xl transition-all text-xs border border-[var(--border-subtle)] active:scale-95" data-slug="${course.slug}">
                    نمایش محتوا
                </button>
                <button class="download-all-btn h-12 flex-1 md:flex-none md:min-w-[140px] flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 shrink-0 font-bold text-xs" data-slug="${course.slug}">
                    <span>دانلود یکجا</span>
                    ${ICONS.download}
                </button>
            </div>
        </div>
    `;
}

function renderChaptersView(course) {
    STATE.currentView = 'chapters';
    const container = document.getElementById('mainContent');
    container.innerHTML = `
        <header class="p-6 md:p-8 flex flex-col gap-6 sticky top-0 bg-[var(--bg-color)]/90 backdrop-blur-2xl z-30 border-b border-[var(--border-subtle)]">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4 min-w-0">
                    <button id="backToDashboard" class="w-10 h-10 md:w-12 md:h-12 glass rounded-2xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-title)] hover:border-[var(--accent-color)] transition-all active:scale-95 shrink-0">
                        ${ICONS.back}
                    </button>
                    <div class="min-w-0">
                        <h1 class="text-2xl md:text-3xl font-black truncate text-[var(--text-title)]">${course.title}</h1>
                        <p class="text-[var(--text-secondary)] text-[10px] font-bold opacity-60">انتخاب محتوا برای دانلود</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button id="selectAllBtn" class="bg-[var(--surface-2)] hover:bg-[var(--btn-ghost-hover-bg)] text-[var(--text-primary)] font-bold h-10 px-4 md:px-6 rounded-xl transition-all text-[10px] md:text-xs border border-[var(--border-subtle)]">
                        انتخاب همه
                    </button>
                    <button id="startDownloadBtn" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black h-10 px-4 md:px-8 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2 text-[10px] md:text-sm">
                        <span>دانلود</span>
                        ${ICONS.download}
                    </button>
                </div>
            </div>
        </header>

        <section class="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
            <div class="space-y-6">
                ${course.chapters.map((chapter, idx) => `
                    <div class="glass p-6 rounded-[2rem] border-[var(--border-subtle)] shadow-xl mb-6">
                        <div class="flex items-center justify-between mb-6 group cursor-pointer chapter-header" data-idx="${idx}">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[var(--surface-2)] flex items-center justify-center font-black text-[var(--text-secondary)] group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-all">
                                    ${idx + 1}
                                </div>
                                <h3 class="text-xl font-black group-hover:text-cyan-500 transition-all text-[var(--text-title)]">${chapter.title}</h3>
                            </div>
                            <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--surface-2)] transition-all chapter-toggle">
                                <span class="text-xs font-bold text-[var(--text-secondary)] ml-2">${chapter.units.length} درس</span>
                                <div class="w-6 h-6 border-2 border-[var(--border-subtle)] rounded-lg flex items-center justify-center transition-all bg-[var(--surface-2)] group-hover:border-cyan-500/50 chapter-check-box">
                                    <span class="text-cyan-400 opacity-0 transition-opacity chapter-check-icon">
                                        ${ICONS.check}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-2 mr-4 border-r border-[var(--border-subtle)] pr-6">
                            ${chapter.units.map((unit, uIdx) => `
                                <div class="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--surface-2)] transition-all group cursor-pointer unit-item" data-chapter="${idx}" data-slug="${unit.slug}">
                                    <span class="font-bold text-base text-[var(--text-primary)] unit-title">${unit.title}</span>
                                <div class="w-5 h-5 border-2 border-[var(--border-subtle)] rounded-md flex items-center justify-center transition-all bg-[var(--surface-2)] group-hover:border-cyan-500/50 unit-check-box">
                                    <span class="text-cyan-500 opacity-0 transition-opacity check-icon">
                                        ${ICONS.check}
                                    </span>
                                </div>
                                    <input type="checkbox" class="unit-checkbox hidden">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    document.getElementById('backToDashboard').addEventListener('click', renderDashboardContent);

    const toggleItem = (el, forceState = null) => {
        const checkbox = el.querySelector('input');
        const checkIcon = el.querySelector('.check-icon');
        const wrapper = el.querySelector('div.unit-check-box'); // Ensure we target the right div

        checkbox.checked = forceState !== null ? forceState : !checkbox.checked;
        if (checkbox.checked) {
            checkIcon.classList.remove('opacity-0');
            wrapper?.classList.add('border-cyan-500/50', 'bg-cyan-500/10');
        } else {
            checkIcon.classList.add('opacity-0');
            wrapper?.classList.remove('border-cyan-500/50', 'bg-cyan-500/10');
        }
    };

    const toggleChapter = (chapterDiv, forceState = null) => {
        const checkIcon = chapterDiv.querySelector('.chapter-check-icon');
        const checkBox = chapterDiv.querySelector('.chapter-check-box');
        const units = chapterDiv.closest('.glass').querySelectorAll('.unit-item');

        let newState = forceState;
        if (newState === null) {
            const allChecked = Array.from(units).every(u => u.querySelector('input').checked);
            newState = !allChecked;
        }

        units.forEach(u => toggleItem(u, newState));

        if (newState) {
            checkIcon.classList.remove('opacity-0');
            checkBox.classList.add('border-cyan-500/50', 'bg-cyan-500/10');
        } else {
            checkIcon.classList.add('opacity-0');
            checkBox.classList.remove('border-cyan-500/50', 'bg-cyan-500/10');
        }
    };

    container.querySelectorAll('.unit-item').forEach(el => {
        el.addEventListener('click', (e) => {
            toggleItem(el);
            // Update chapter toggle state if needed
            const chapterGlass = el.closest('.glass');
            const chapterHeader = chapterGlass.querySelector('.chapter-header');
            const units = chapterGlass.querySelectorAll('.unit-item');
            const allChecked = Array.from(units).every(u => u.querySelector('input').checked);

            const chapterIcon = chapterHeader.querySelector('.chapter-check-icon');
            const chapterBox = chapterHeader.querySelector('.chapter-check-box');
            if (allChecked) {
                chapterIcon.classList.remove('opacity-0');
                chapterBox.classList.add('border-cyan-500/50', 'bg-cyan-500/10');
            } else {
                chapterIcon.classList.add('opacity-0');
                chapterBox.classList.remove('border-cyan-500/50', 'bg-cyan-500/10');
            }
        });
    });

    container.querySelectorAll('.chapter-header').forEach(el => {
        el.addEventListener('click', () => toggleChapter(el));
    });

    document.getElementById('selectAllBtn').addEventListener('click', () => {
        const allChapters = container.querySelectorAll('.chapter-header');
        const allUnits = container.querySelectorAll('.unit-item');
        const allChecked = Array.from(allUnits).every(el => el.querySelector('input').checked);

        allChapters.forEach(ch => toggleChapter(ch, !allChecked));
        document.getElementById('selectAllBtn').innerText = !allChecked ? 'لغو انتخاب تمام فصل‌ها' : 'انتخاب تمام فصل‌ها';
    });

    const startBtn = document.getElementById('startDownloadBtn');
    startBtn.addEventListener('click', async () => {
        if (startBtn.classList.contains('opacity-50')) return;

        const selected = Array.from(container.querySelectorAll('.unit-checkbox:checked')).map(cb => {
            const parent = cb.closest('.unit-item');
            return {
                chapter: parent.dataset.chapter,
                slug: parent.dataset.slug,
                title: parent.querySelector('.unit-title').innerText
            };
        });

        if (selected.length === 0) return ToastManager.show('لطفا حداقل یک درس را انتخاب کنید', 'warn');

        startBtn.classList.add('opacity-50', 'pointer-events-none');
        startBtn.innerHTML = `<span>در حال بررسی...</span> <div class="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>`;

        try {
            const settings = JSON.parse(localStorage.getItem('userSettings') || '{"quality": "720", "path": "", "concurrency": 1, "speedLimit": 0, "beep": true}');

            const existingTitles = await window.electron.ipcRenderer.invoke('check-existing-units', {
                courseSlug: course.slug,
                selectedUnits: selected,
                quality: settings.quality,
                customPath: settings.path
            });

            let unitsToDownload = selected;
            if (existingTitles.length > 0) {
                ToastManager.show(`${existingTitles.length} فایل از قبل در حافظه موجود است و از لیست حذف شد.`, 'warn', 5000);
                unitsToDownload = selected.filter(s => !existingTitles.includes(s.title));

                if (unitsToDownload.length === 0) {
                    startBtn.classList.remove('opacity-50', 'pointer-events-none');
                    startBtn.innerHTML = `<span>دانلود</span> ${ICONS.download}`;
                    return;
                }
            }

            // Pre-populate downloads list for immediate feedback
            STATE.downloads = unitsToDownload.map(item => ({
                fileName: item.title,
                unitSlug: item.slug,
                // Critical for resume: store chapter index
                chapter: item.chapter,
                progress: 0,
                status: 'queued'
            }));

            updateNav('navDownloads');
            renderDownloadsContent();

            const result = await window.electron.ipcRenderer.invoke('start-download', {
                courseSlug: course.slug,
                selectedUnits: unitsToDownload,
                quality: settings.quality,
                customPath: settings.path,
                concurrency: settings.concurrency,
                speedLimit: settings.speedLimit
            });
            // Removed redundant ToastManager.show here to reduce noise
            renderDownloadsContent();
        } catch (err) {
            console.error('Download start error:', err);
            ToastManager.show('خطا در پردازش لیست دانلود', 'error');
            startBtn.classList.remove('opacity-50', 'pointer-events-none');
            startBtn.innerHTML = `<span>دانلود</span> ${ICONS.download}`;
        }
    });
}

function formatSpeed(bytesPerSec) {
    if (bytesPerSec === 0) return '0 B/s';
    const k = 1024;
    const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
    const i = Math.floor(Math.log(bytesPerSec) / Math.log(k));
    return parseFloat((bytesPerSec / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatETA(seconds) {
    if (seconds <= 0 || !isFinite(seconds)) return '--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function renderDownloadsContent() {
    STATE.currentView = 'downloads';
    updateSectionHeader('مدیریت دانلودها', 'کنترل دقیق و مانیتورینگ پهنای باند');
    const container = document.getElementById('mainContent');

    const activeDownloads = STATE.downloads.filter(d => d.status === 'downloading' || d.status === 'connecting');
    const finishedDownloads = STATE.downloads.filter(d => d.status === 'completed');
    const queuedDownloads = STATE.downloads.filter(d => d.status === 'queued' || d.status === 'paused');

    let filteredList = [];
    if (STATE.downloadTab === 'all') filteredList = STATE.downloads;
    else if (STATE.downloadTab === 'active') filteredList = activeDownloads;
    else if (STATE.downloadTab === 'finished') filteredList = finishedDownloads;
    else if (STATE.downloadTab === 'queued') filteredList = queuedDownloads;

    const totalProgress = STATE.downloads.length > 0 ? Math.round(STATE.downloads.reduce((acc, d) => acc + (d.progress || 0), 0) / STATE.downloads.length) : 0;

    // Determine which bulk buttons should be enabled
    const hasActive = activeDownloads.length > 0;
    const hasPaused = STATE.downloads.some(d => d.status === 'paused');
    const hasFinished = finishedDownloads.length > 0;
    const hasAny = STATE.downloads.length > 0;

    container.innerHTML = `
        <header class="p-8 pb-0 border-b border-[var(--border-subtle)] bg-[var(--surface-1)]">
            <div class="flex items-center justify-between mb-8">
                <div></div>
                <div class="flex items-center gap-3 ${!hasAny ? 'hidden' : ''}">
                    <button id="pauseAllBtn" class="bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-orange-500/5 font-black text-sm flex items-center gap-3 active:scale-95 ${!hasActive ? 'btn-disabled' : ''}">
                        ${ICONS.pause} توقف همه
                    </button>
                    <button id="resumeAllBtn" class="bg-cyan-500/10 hover:bg-cyan-500 text-cyan-500 hover:text-slate-900 px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-cyan-500/5 font-black text-sm flex items-center gap-3 active:scale-95 ${!hasPaused ? 'btn-disabled' : ''}">
                        ${ICONS.play} ادامه همه
                    </button>
                    <button id="clearFinishedBtn" class="bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)] text-[var(--text-secondary)] px-6 py-3.5 rounded-2xl transition-all font-black text-sm flex items-center gap-3 active:scale-95 border border-[var(--border-subtle)] ${!hasFinished ? 'btn-disabled' : ''}">
                        ${ICONS.check} پاکسازی تکمیل شده‌ها
                    </button>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="flex items-center gap-12 border-b border-transparent">
                ${['all', 'active', 'finished', 'queued'].map(tab => `
                    <button class="download-tab-btn pb-4 relative transition-all ${STATE.downloadTab === tab ? 'text-cyan-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] opacity-60 hover:opacity-100'}" data-tab="${tab}">
                        <span class="text-sm font-black uppercase tracking-widest">
                            ${tab === 'all' ? 'همه' : tab === 'active' ? 'در حال انجام' : tab === 'finished' ? 'تکمیل شده' : 'در صف / متوقف'}
                        </span>
                        <span class="mr-2 text-[10px] bg-[var(--surface-2)] px-2 py-0.5 rounded-full font-mono">
                            ${tab === 'all' ? STATE.downloads.length : tab === 'active' ? activeDownloads.length : tab === 'finished' ? finishedDownloads.length : queuedDownloads.length}
                        </span>
                        ${STATE.downloadTab === tab ? '<div class="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-full shadow-[0_0_15px_var(--accent-glow)] animate-in fade-in duration-500"></div>' : ''}
                    </button>
                `).join('')}
            </div>
        </header>

        <section class="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar pt-8">
            <!-- Datagrid Header -->
            <div class="grid grid-cols-12 gap-4 px-6 py-4 mb-4 bg-[var(--surface-2)] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-50">
                <div class="col-span-1">No</div>
                <div class="col-span-5">نام درس / واحد</div>
                <div class="col-span-3">پیشرفت</div>
                <div class="col-span-1">سرعت</div>
                <div class="col-span-1">زمان</div>
                <div class="col-span-1 text-center">عملیات</div>
            </div>

            <div class="space-y-1.5" id="downloadsList">
                ${filteredList.length === 0 ? `
                    <div class="premium-card p-20 text-center flex flex-col items-center gap-8 mt-12 bg-transparent border-dashed">
                        <div class="w-24 h-24 bg-[var(--surface-2)] rounded-[2.5rem] flex items-center justify-center text-[var(--text-secondary)] rotate-12 opacity-50">
                            ${ICONS.download}
                        </div>
                        <p class="text-[var(--text-secondary)] text-sm opacity-60 font-bold italic">موردی برای نمایش در این بخش وجود ندارد</p>
                    </div>
                ` : filteredList.map((item, idx) => `
                    <div id="dl-row-${item.unitSlug}" class="datagrid-row grid grid-cols-12 gap-4 px-6 py-4 items-center rounded-2xl hover:bg-[var(--surface-2)]/50 transition-colors border border-transparent hover:border-[var(--border-subtle)] group relative overflow-hidden" draggable="true" data-slug="${item.unitSlug}">
                        <!-- Progress Glow Indicator -->
                        ${item.status === 'downloading' ? `<div class="progress-glow absolute top-0 right-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_cyan] opacity-30"></div>` : ''}
                        
                        <div class="col-span-1 flex items-center gap-3">
                            <div class="sort-handle text-[var(--text-secondary)] opacity-20 group-hover:opacity-100 transition-all cursor-grab active:cursor-grabbing">
                                ${ICONS.grip}
                            </div>
                            <span class="text-xs font-mono opacity-40 font-bold">#${idx + 1}</span>
                        </div>
                        <div class="col-span-5">
                            <h4 class="text-sm font-black truncate text-[var(--text-title)] mb-1 group-hover:text-cyan-500 transition-colors">${item.fileName}</h4>
                            <p class="text-[10px] opacity-40 truncate font-mono">${item.filePath}</p>
                        </div>
                        <div class="col-span-3 flex flex-col gap-2">
                            <div class="flex items-center justify-between text-[10px] font-mono font-bold">
                                <span class="size-text opacity-60">${formatSize(item.downloaded || 0)} / ${formatSize(item.total || 0)}</span>
                                <span class="percent-text text-cyan-500">${Math.round(item.progress)}%</span>
                            </div>
                            <div class="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                                <div class="progress-bar h-full ${item.progress === 100 ? 'bg-green-500' : (item.status === 'paused' ? 'bg-orange-400' : 'bg-cyan-500')} rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]" style="width: ${item.progress}%"></div>
                            </div>
                        </div>
                        <div class="speed-text col-span-1 text-xs font-mono font-bold text-cyan-500 opacity-80">${formatSpeed(item.speed || 0)}</div>
                        <div class="eta-text col-span-1 text-xs font-mono font-bold opacity-60">${formatETA(item.eta || 0)}</div>
                        <div class="col-span-1 flex items-center justify-center gap-1">
                            ${item.status === 'completed' ? `
                                <button class="w-10 h-10 flex items-center justify-center text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-900 rounded-xl transition-all open-item-btn shadow-lg shadow-cyan-500/5 group/btn" data-idx="${STATE.downloads.indexOf(item)}" title="باز کردن فایل">
                                    ${ICONS.eye}
                                </button>
                            ` : `
                                <button class="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all pause-item-btn ${item.status === 'queued' || item.status === 'completed' ? 'btn-disabled' : ''}" data-idx="${STATE.downloads.indexOf(item)}">
                                    ${item.status === 'paused' ? ICONS.play : ICONS.pause}
                                </button>
                                <button class="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cancel-item-btn ${item.status === 'completed' ? 'btn-disabled' : ''}" data-idx="${STATE.downloads.indexOf(item)}">
                                    ${ICONS.close}
                                </button>
                            `}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Terminal-like Logs -->
            <div class="mt-12 premium-card !rounded-[2.5rem] flex flex-col h-96 shadow-2xl overflow-hidden bg-[var(--surface-1)]">
                <div class="bg-[var(--surface-2)] px-8 py-5 border-b border-[var(--border-subtle)]/50 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_var(--accent-glow)]"></div>
                        <span class="text-xs font-black text-[var(--text-title)] uppercase tracking-[0.2em] opacity-80">گزارشات عملیات</span>
                    </div>
                </div>
                <div id="logPipe" class="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar log-pipe-bg">
                    ${STATE.logs.map(log => {
        const badgeClass = log.type === 'success' ? 'badge-success' : log.type === 'warn' ? 'badge-warn' : log.type === 'error' ? 'badge-error' : 'badge-info';
        const badgeText = log.type === 'success' ? 'موفق' : log.type === 'warn' ? 'هشدار' : log.type === 'error' ? 'خطا' : 'گزارش';
        return `
                            <div class="log-entry animate-in fade-in slide-in-from-right-2 duration-300">
                                <span class="log-badge ${badgeClass}">${badgeText}</span>
                                <div class="flex flex-col gap-1 min-w-0">
                                    <p class="text-[13px] font-medium leading-relaxed text-[var(--text-primary)]">${log.message}</p>
                                    <span class="text-[9px] font-bold opacity-30 uppercase tracking-tighter">${new Date().toLocaleTimeString('fa-IR')}</span>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>
            </div>
        </section>
    `;

    // Tab Switching
    container.querySelectorAll('.download-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            STATE.downloadTab = btn.dataset.tab;
            renderDownloadsContent();
        });
    });

    // Bulk Actions
    document.getElementById('pauseAllBtn')?.addEventListener('click', async () => {
        const active = STATE.downloads.filter(d => d.status === 'downloading' || d.status === 'connecting');
        for (const item of active) {
            await window.electron.ipcRenderer.invoke('pause-download', { filePath: item.filePath });
            item.status = 'paused';
        }
        renderDownloadsContent();
    });

    document.getElementById('resumeAllBtn')?.addEventListener('click', async () => {
        const paused = STATE.downloads.filter(d => d.status === 'paused');
        for (const item of paused) {
            await window.electron.ipcRenderer.invoke('resume-download', { filePath: item.filePath });
            item.status = 'downloading';
        }
        renderDownloadsContent();
    });

    document.getElementById('clearFinishedBtn')?.addEventListener('click', async () => {
        STATE.downloads = STATE.downloads.filter(d => d.status !== 'completed');
        await window.electron.ipcRenderer.invoke('clear-finished-downloads'); // Optional IPC
        renderDownloadsContent();
    });

    // Listeners for individual items
    container.querySelectorAll('.cancel-item-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = btn.dataset.idx;
            const item = STATE.downloads[idx];
            if (item) {
                // Queued items can just be removed from state without IPC
                if (item.status === 'queued') {
                    STATE.downloads.splice(idx, 1);
                    renderDownloadsContent();
                    return;
                }
                if (item.status === 'downloading') {
                    ConfirmModal.show('آیا از لغو این دانلود اطمینان دارید؟', async () => {
                        if (item.filePath) {
                            await window.electron.ipcRenderer.invoke('cancel-download', { filePath: item.filePath });
                        }
                        const currentIdx = STATE.downloads.indexOf(item); // Re-find index
                        if (currentIdx > -1) STATE.downloads.splice(currentIdx, 1);
                        renderDownloadsContent();
                    });
                    return;
                }
                if (item.filePath) {
                    await window.electron.ipcRenderer.invoke('cancel-download', { filePath: item.filePath });
                }
                STATE.downloads.splice(idx, 1);
                renderDownloadsContent();
            }
        });
    });

    container.querySelectorAll('.pause-item-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = btn.dataset.idx;
            const item = STATE.downloads[idx];
            if (!item || !item.filePath || item.status === 'queued' || item.status === 'completed') return;
            if (item.status === 'paused') {
                await window.electron.ipcRenderer.invoke('resume-download', {
                    filePath: item.filePath,
                    unitSlug: item.unitSlug,
                    title: item.fileName,
                    chapter: item.chapter
                });
                item.status = 'downloading';
            } else {
                await window.electron.ipcRenderer.invoke('pause-download', { filePath: item.filePath });
                item.status = 'paused';
            }
            renderDownloadsContent();
        });
    });

    container.querySelectorAll('.open-item-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = btn.dataset.idx;
            const item = STATE.downloads[idx];
            if (item && item.filePath) {
                await window.electron.ipcRenderer.invoke('reveal-in-path', { path: item.filePath });
            }
        });
    });

    initDragAndDrop();
}

function initDragAndDrop() {
    const list = document.getElementById('downloadsList');
    const rows = list.querySelectorAll('.datagrid-row');
    let draggedItem = null;

    rows.forEach(row => {
        row.addEventListener('dragstart', (e) => {
            draggedItem = row;
            row.classList.add('dragging');
            // Give it some glassmorphism while dragging
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', row.dataset.slug);

            // Subtle delay to hide original while ghost follows cursor
            setTimeout(() => row.style.display = 'none', 0);
        });

        row.addEventListener('dragend', () => {
            row.classList.remove('dragging');
            row.style.display = 'grid';
            draggedItem = null;
            rows.forEach(r => r.classList.remove('drag-over'));

            // Re-render to update index numbers
            renderDownloadsContent();
        });

        row.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const target = e.target.closest('.datagrid-row');
            if (target && target !== draggedItem) {
                target.classList.add('drag-over');
            }
        });

        row.addEventListener('dragleave', (e) => {
            const target = e.target.closest('.datagrid-row');
            if (target) {
                target.classList.remove('drag-over');
            }
        });

        row.addEventListener('drop', (e) => {
            e.preventDefault();
            const target = e.target.closest('.datagrid-row');

            if (target && target !== draggedItem) {
                const dropSlug = target.dataset.slug;
                const dragSlug = draggedItem.dataset.slug;

                const dragIdx = STATE.downloads.findIndex(d => d.unitSlug === dragSlug);
                const dropIdx = STATE.downloads.findIndex(d => d.unitSlug === dropSlug);

                if (dragIdx > -1 && dropIdx > -1) {
                    const item = STATE.downloads.splice(dragIdx, 1)[0];
                    STATE.downloads.splice(dropIdx, 0, item);

                    // Notify backend of the new queue order (only for non-started items)
                    const queuedSlugs = STATE.downloads
                        .filter(d => d.status === 'queued' || d.status === 'paused')
                        .map(d => d.unitSlug);

                    window.electron.ipcRenderer.invoke('update-download-queue', { newOrderSlugs: queuedSlugs });
                }
            }
        });
    });
}

// IPC Listeners
window.electron.ipcRenderer.on('downloader-log', ({ type, message }) => {
    STATE.logs.push({ type, message });
    if (STATE.currentView === 'downloads') {
        const pipe = document.getElementById('logPipe');
        if (pipe) {
            const badgeClass = type === 'success' ? 'badge-success' : type === 'warn' ? 'badge-warn' : type === 'error' ? 'badge-error' : 'badge-info';
            const badgeText = type === 'success' ? 'موفق' : type === 'warn' ? 'هشدار' : type === 'error' ? 'خطا' : 'گزارش';

            const div = document.createElement('div');
            div.className = 'log-entry animate-in fade-in slide-in-from-right-2 duration-300';
            div.innerHTML = `
                <span class="log-badge ${badgeClass}">${badgeText}</span>
                <div class="flex flex-col gap-1 min-w-0">
                    <p class="text-[13px] font-medium leading-relaxed text-[var(--text-primary)]">${message}</p>
                    <span class="text-[9px] font-bold opacity-30 uppercase tracking-tighter">${new Date().toLocaleTimeString('fa-IR')}</span>
                </div>
            `;
            pipe.appendChild(div);
            // Limit shown logs for performance
            while (pipe.children.length > 50) pipe.removeChild(pipe.firstChild);
            pipe.scrollTop = pipe.scrollHeight;
        }
    }
});

window.electron.ipcRenderer.on('download-started', ({ filePath, fileName, unitSlug }) => {
    const item = STATE.downloads.find(d => d.unitSlug === unitSlug);
    if (item) {
        item.filePath = filePath;
        item.status = 'downloading';
        item.progress = 0;
    } else {
        STATE.downloads.push({
            fileName,
            filePath,
            unitSlug,
            progress: 0,
            status: 'downloading'
        });
    }
    if (STATE.currentView === 'downloads') renderDownloadsContent();
});

window.electron.ipcRenderer.on('download-session-complete', () => {
    ToastManager.show('تمامی دانلودها در این نوبت به پایان رسید.', 'success');
    if (STATE.currentView === 'downloads') renderDownloadsContent();
});

window.electron.ipcRenderer.on('download-progress', ({ filePath, downloaded, total }) => {
    const now = Date.now();
    const fileName = filePath.split(/[/\\]/).pop();
    const progress = (downloaded / total) * 100;

    let item = STATE.downloads.find(d => d.filePath === filePath);
    if (!item) {
        item = {
            fileName,
            filePath,
            progress,
            status: 'downloading',
            downloaded,
            total,
            lastUpdate: now,
            lastDownloaded: downloaded,
            speed: 0,
            eta: 0
        };
        STATE.downloads.push(item);
    } else {
        // Initialize values for speed calculation if they don't exist
        if (!item.lastUpdate) {
            item.lastUpdate = now;
            item.lastDownloaded = downloaded;
            item.speed = 0;
        }

        // Calculate Speed using Moving Average for smoothness
        const timeDiff = (now - item.lastUpdate) / 1000;
        if (timeDiff >= 1.0) { // Update speed every 1 second for stability
            const bytesDiff = downloaded - item.lastDownloaded;
            const instantSpeed = bytesDiff / timeDiff;

            // Simple Moving Average (SMA) or Exponential Moving Average (EMA)
            // Using EMA with alpha = 0.2 (20% new, 80% old) for smoothing
            if (!item.speed) item.speed = instantSpeed;
            else item.speed = (item.speed * 0.8) + (instantSpeed * 0.2);

            const remainingBytes = total - downloaded;
            const newEta = item.speed > 0 ? remainingBytes / item.speed : 0;

            // Smooth ETA as well prevents jumping from 5m to 20m suddenly
            if (!item.eta) item.eta = newEta;
            else item.eta = (item.eta * 0.9) + (newEta * 0.1);

            item.lastUpdate = now;
            item.lastDownloaded = downloaded;
        }

        item.downloaded = downloaded;
        item.total = total;
        item.progress = progress;
        item.status = progress === 100 ? 'completed' : 'downloading';
    }

    if (STATE.currentView === 'downloads') {
        // High-Performance Selective DOM Updating
        const row = document.getElementById(`dl-row-${item.unitSlug}`);
        if (row) {
            const sizeEl = row.querySelector('.size-text');
            const percentEl = row.querySelector('.percent-text');
            const barEl = row.querySelector('.progress-bar');
            const speedEl = row.querySelector('.speed-text');
            const etaEl = row.querySelector('.eta-text');

            if (sizeEl) sizeEl.textContent = `${formatSize(downloaded)} / ${formatSize(total)}`;
            if (percentEl) percentEl.textContent = `${Math.round(progress)}%`;
            if (barEl) barEl.style.width = `${progress}%`;
            if (speedEl) speedEl.textContent = formatSpeed(item.speed || 0);
            if (etaEl) etaEl.textContent = formatETA(item.eta || 0);

            // Handle Glow
            let glow = row.querySelector('.progress-glow');
            if (item.status === 'downloading' && !glow) {
                const div = document.createElement('div');
                div.className = 'progress-glow absolute top-0 right-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_cyan] opacity-30';
                row.appendChild(div);
            } else if (item.status !== 'downloading' && glow) {
                glow.remove();
            }
        } else {
            // Row not in current view/tab, but existing in STATE. Usually happens when switching tabs.
            // No full render here to keep it smooth.
        }
    }
});

window.electron.ipcRenderer.on('download-file-complete', ({ filePath, fileName, unitSlug }) => {
    const item = STATE.downloads.find(d => d.filePath === filePath || d.unitSlug === unitSlug);
    if (item) {
        item.status = 'completed';
        item.progress = 100;
        item.speed = 0;
        item.eta = 0;
        if (STATE.currentView === 'downloads') renderDownloadsContent();
        ToastManager.show(`دانلود فایل ${fileName} تکمیل شد.`, 'success');
    }
});

window.electron.ipcRenderer.on('download-session-complete', (event, data) => {
    // If backend sent { completed: N }, use it. Otherwise assume all (legacy).
    const completedCount = data && typeof data === 'object' && typeof data.completed === 'number'
        ? data.completed
        : 1;

    if (completedCount > 0) {
        ToastManager.show('نوبت دانلود به پایان رسید.', 'success');
    } else {
        // If nothing completed (all paused/cancelled/failed), show info instead of success
        ToastManager.show('نوبت دانلود متوقف شد.', 'info');
    }
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{"beep": true}');
    if (settings.beep) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } catch (e) { console.error('Audio failed', e); }
    }
});

function renderSettingsContent() {
    STATE.currentView = 'settings';
    updateSectionHeader('تنظیمات پیشرفته', 'پیکربندی هوشمند و مدیریت زیرساخت برنامه');
    const container = document.getElementById('mainContent');
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{"quality": "720", "path": "", "concurrency": 1, "speedLimit": 0, "beep": true, "theme": "dark", "fontSize": "medium"}');

    container.innerHTML = `
        <header class="p-8 pb-0 border-b border-[var(--border-subtle)] bg-[var(--surface-1)]">
            <div class="flex items-center justify-between mb-8">
                <div></div>
                <div class="flex items-center gap-3">
                    <button id="resetSettingsBtn" class="bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)] text-[var(--text-secondary)] px-6 py-3.5 rounded-2xl transition-all font-black text-sm flex items-center gap-3 active:scale-95 border border-[var(--border-subtle)]">
                        ${ICONS.alert} بازگشت به تنظیمات اولیه
                    </button>
                </div>
            </div>
        </header>

        <section class="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar pt-8">
            <div class="max-w-6xl mx-auto space-y-12">
                
                <!-- Section: Storage & Quality -->
                <div>
                    <h2 class="settings-group-title">ذخیره‌سازی و کیفیت ویدیو</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="settings-card space-y-6">
                            <div class="flex items-center gap-4 mb-2">
                                <div class="w-10 h-10 bg-cyan-500/10 text-cyan-500 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                                </div>
                                <h3 class="text-lg font-black text-[var(--text-title)]">کیفیت پیش‌فرض</h3>
                            </div>
                            <div class="segmented-control">
                                ${['480', '720', '1080'].map(q => `
                                    <button class="segmented-btn quality-btn ${settings.quality === q ? 'active' : ''}" data-quality="${q}">
                                        ${q}P High
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="settings-card space-y-6">
                            <div class="flex items-center gap-4 mb-2">
                                <div class="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <h3 class="text-lg font-black text-[var(--text-title)]">مسیر ذخیره‌سازی</h3>
                            </div>
                            <div class="flex gap-2">
                                <input type="text" id="downloadPath" value="${settings.path || 'پیش‌فرض سیتم'}" readonly class="flex-1 theme-input rounded-xl px-4 font-mono text-[10px] text-[var(--text-secondary)] outline-none">
                                <button id="changePathBtn" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl transition-all font-black text-xs shrink-0 shadow-lg shadow-cyan-500/10">
                                    تغییر
                                </button>
                                <button id="revealPathBtn" class="bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)] text-[var(--text-primary)] p-2.5 rounded-xl transition-all shrink-0 border border-[var(--border-subtle)]">
                                    ${ICONS.eye}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section: Network & Engine -->
                <div>
                    <h2 class="settings-group-title">شبکه و موتور پردازش</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="settings-card space-y-6">
                            <div class="flex items-center gap-4 mb-2">
                                <div class="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                                </div>
                                <h3 class="text-lg font-black text-[var(--text-title)]">محدودیت سرعت کلی</h3>
                            </div>
                            <select id="speedLimitSelect" class="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all cursor-pointer theme-input font-black premium-select">
                                <option value="0" ${settings.speedLimit === 0 ? 'selected' : ''}>بدون محدودیت (پیشنهادی)</option>
                                <option value="500" ${settings.speedLimit === 500 ? 'selected' : ''}>500 KB/s - محدود</option>
                                <option value="1000" ${settings.speedLimit === 1000 ? 'selected' : ''}>1 MB/s - استاندارد</option>
                                <option value="5000" ${settings.speedLimit === 5000 ? 'selected' : ''}>5 MB/s - سریع</option>
                                <option value="10000" ${settings.speedLimit === 10000 ? 'selected' : ''}>10 MB/s - حرفه‌ای</option>
                            </select>
                        </div>

                        <div class="settings-card space-y-6">
                            <div class="flex items-center gap-4 mb-2">
                                <div class="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M11 12 8 9"/><path d="m15 12-3 3"/></svg>
                                </div>
                                <h3 class="text-lg font-black text-[var(--text-title)]">تعداد دانلود همزمان</h3>
                            </div>
                            <div class="tactile-stepper">
                                <button class="stepper-btn" id="decConcurrency">${ICONS.minus}</button>
                                <div class="stepper-value" id="concurrencyValue">${settings.concurrency}</div>
                                <button class="stepper-btn" id="incConcurrency">${ICONS.plus}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section: Interface & Audio -->
                <div>
                    <h2 class="settings-group-title">رابط کاربری و محیط برنامه</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="settings-card">
                            <h4 class="text-xs font-black opacity-40 uppercase mb-4">پوسته بصری</h4>
                            <div class="segmented-control">
                                ${['dark', 'light', 'system'].map(t => `
                                    <button class="segmented-btn theme-btn ${settings.theme === t ? 'active' : ''}" data-theme="${t}">
                                        ${t === 'dark' ? 'تیره' : t === 'light' ? 'روشن' : 'اتوماتیک'}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="settings-card">
                            <h4 class="text-xs font-black opacity-40 uppercase mb-4">اندازه متن</h4>
                            <div class="segmented-control">
                                ${['small', 'medium', 'large'].map(s => `
                                    <button class="segmented-btn font-btn ${settings.fontSize === s ? 'active' : ''}" data-size="${s}">
                                        ${s === 'small' ? 'ریز' : s === 'medium' ? 'عادی' : 'درشت'}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="settings-card flex items-center justify-between">
                            <div>
                                <h4 class="text-sm font-black text-[var(--text-title)]">اعلان صوتی</h4>
                                <p class="text-[10px] opacity-40 font-bold">پایان دانلودها</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="beepToggle" class="sr-only peer" ${settings.beep ? 'checked' : ''}>
                                <div class="premium-switch"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Section: System Maintenance -->
                <div class="pt-8 border-t border-[var(--border-subtle)]">
                    <div class="flex flex-col md:flex-row gap-4 items-center justify-between p-8 bg-red-500/5 rounded-[2rem] border border-red-500/10">
                        <div>
                            <h3 class="text-xl font-black text-red-400 mb-1">عملیات حساس سیستمی</h3>
                            <p class="text-xs text-red-400/60 font-medium">پاکسازی حافظه کش و بازگردانی تنظیمات به حالت اولیه</p>
                        </div>
                        <div class="flex gap-3 w-full md:w-auto">
                            <button id="clearCacheBtn" class="flex-1 md:flex-none border border-red-500/20 hover:bg-red-500/10 text-red-500 px-8 py-3.5 rounded-2xl transition-all font-black text-sm active:scale-95 shadow-lg shadow-red-500/5">
                                پاکسازی کش برنامه
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    `;

    const saveSettings = (newSettings) => {
        localStorage.setItem('userSettings', JSON.stringify({ ...settings, ...newSettings }));
        ToastManager.show('تنظیمات با موفقیت ذخیره شد.', 'success', 2000);
    };

    // Quality Picker
    container.querySelectorAll('.quality-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.dataset.quality;
            container.querySelectorAll('.quality-btn').forEach(b => b.classList.toggle('active', b === btn));
            saveSettings({ quality: q });
        });
    });

    // Theme Picker
    container.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const t = btn.dataset.theme;
            container.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b === btn));
            applyTheme(t);
            saveSettings({ theme: t });
        });
    });

    // Font Picker
    container.querySelectorAll('.font-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const s = btn.dataset.size;
            container.querySelectorAll('.font-btn').forEach(b => b.classList.toggle('active', b === btn));
            applyFontSize(s);
            saveSettings({ fontSize: s });
        });
    });

    // Speed Limit
    document.getElementById('speedLimitSelect').addEventListener('change', (e) => {
        saveSettings({ speedLimit: parseInt(e.target.value) });
    });

    // Concurrency Stepper
    let currentConcurrency = settings.concurrency || 1;
    const valEl = document.getElementById('concurrencyValue');
    document.getElementById('incConcurrency').addEventListener('click', () => {
        if (currentConcurrency < 5) {
            currentConcurrency++;
            valEl.innerText = currentConcurrency;
            saveSettings({ concurrency: currentConcurrency });
        }
    });
    document.getElementById('decConcurrency').addEventListener('click', () => {
        if (currentConcurrency > 1) {
            currentConcurrency--;
            valEl.innerText = currentConcurrency;
            saveSettings({ concurrency: currentConcurrency });
        }
    });

    // Toggle Beep
    document.getElementById('beepToggle').addEventListener('change', (e) => {
        saveSettings({ beep: e.target.checked });
    });

    // System Actions
    document.getElementById('changePathBtn').addEventListener('click', async () => {
        const path = await window.electron.ipcRenderer.invoke('select-folder');
        if (path) {
            document.getElementById('downloadPath').value = path;
            saveSettings({ path });
        }
    });

    document.getElementById('revealPathBtn').addEventListener('click', async () => {
        const path = settings.path;
        const success = await window.electron.ipcRenderer.invoke('reveal-in-path', { path });
        if (!success) ToastManager.show('مسیر مورد نظر یافت نشد.', 'error');
    });

    document.getElementById('clearCacheBtn').addEventListener('click', async () => {
        if (!confirm('آیا از پاکسازی کش و داده‌های موقت اطمینان دارید؟')) return;
        const success = await window.electron.ipcRenderer.invoke('clear-cache');
        if (success) ToastManager.show('حافظه کش با موفقیت پاکسازی شد.', 'success');
    });

    document.getElementById('resetSettingsBtn').addEventListener('click', () => {
        if (!confirm('آیا از بازنشانی تمام تنظیمات اطمینان دارید؟')) return;
        localStorage.removeItem('userSettings');
        applyTheme('dark');
        applyFontSize('medium');
        renderSettingsContent();
        ToastManager.show('تنظیمات به حالت پیش‌فرض بازگشت.', 'info');
    });
}

function renderAboutContent() {
    STATE.currentView = 'about';
    updateSectionHeader('درباره توسعه‌دهنده', 'معرفی پروژه و سازنده');
    const container = document.getElementById('mainContent');
    container.innerHTML = `

        <section class="flex-1 overflow-y-auto p-8 custom-scrollbar pt-12">
            <div class="max-w-4xl mx-auto space-y-12">
                <!-- Developer Card -->
                <div class="premium-card p-10 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-cyan-500/[0.05] to-transparent relative overflow-hidden group">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
                    <div class="w-36 h-36 rounded-[2.5rem] bg-cyan-500 flex items-center justify-center text-6xl font-black text-slate-900 shadow-2xl shadow-cyan-500/40 shrink-0 transform transition-transform group-hover:scale-105 duration-500">V</div>
                    <div class="flex-1 text-center md:text-right">
                        <div class="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <h2 class="text-4xl font-black text-[var(--text-title)]">VeilVulp</h2>
                            <span class="bg-cyan-500/10 text-cyan-500 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-black">Lead Developer</span>
                        </div>
                        <p class="text-[var(--text-primary)] text-lg leading-relaxed opacity-80 mb-8 max-w-2xl">
                            توسعه‌دهنده متمرکز بر ابزارهای خودکارسازی با رویکرد ارائه رابط کاربری مدرن و تجربه کاربری حرفه‌ای. این پروژه بخشی از تلاش برای ساده‌سازی دسترسی به آموزش است.
                        </p>
                        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <a href="https://github.com/VeilVulp" target="_blank" class="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-cyan-500/20 group">
                                <span class="bg-white/20 p-1.5 rounded-lg">${ICONS.github}</span>
                                <span>پروفایل گیت‌هاب</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Features & Specs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="glass p-10 rounded-[2.5rem] border-[var(--border-subtle)] relative group">
                        <div class="w-12 h-12 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500/10 transition-colors">
                            ${ICONS.dashboard}
                        </div>
                        <h3 class="text-2xl font-black mb-6 text-[var(--text-title)]">قابلیت‌های پروژه</h3>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-4 text-[var(--text-secondary)] font-bold italic">
                                <div class="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                                <span>دانلود هوشمند و طبقه‌بندی شده دوره‌ها به صورت یکجا</span>
                            </li>
                            <li class="flex items-start gap-4 text-[var(--text-secondary)] font-bold italic">
                                <div class="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                                <span>مدیریت ترافیک مصرفی و کنترل دانلودهای همزمان</span>
                            </li>
                            <li class="flex items-start gap-4 text-[var(--text-secondary)] font-bold italic">
                                <div class="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
                                <span>رابط کاربری پیشرفته با پشتیبانی از تم‌های تیره و روشن</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="glass p-10 rounded-[2.5rem] border-[var(--border-subtle)] flex flex-col justify-between">
                        <div>
                           <div class="w-12 h-12 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-cyan-500 mb-6">
                                ${ICONS.info}
                            </div>
                            <h3 class="text-2xl font-black mb-6 text-[var(--text-title)]">درباره این نسخه</h3>
                            <p class="text-[var(--text-secondary)] font-bold leading-loose opacity-70 italic">
                                نسخه ۱.۰.۰ حاصل تلاش برای ترکیب قدرت برنامه‌نویسی با هنر طراحی رابط کاربری است. ما در این نسخه روی پایداری و سهولت استفاده تمرکز کرده‌ایم.
                            </p>
                        </div>
                        <div class="pt-8 mt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
                            <span class="text-[10px] font-black uppercase tracking-widest text-cyan-500/50">Status</span>
                            <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500">Production Ready</span>
                        </div>
                    </div>
                </div>

                <div class="text-center py-12">
                    <div class="inline-block px-6 py-2 rounded-full bg-[var(--surface-2)] border border-[var(--border-subtle)]">
                         <p class="text-[9px] font-mono tracking-[0.6em] uppercase text-[var(--text-secondary)]">Design & Development by VeilVulp</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

renderLogin();

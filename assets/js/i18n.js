/* ============================================
   ARKIVE.SU — i18n Language Engine
   ============================================ */

const SUPPORTED_LANGS = ['en', 'ru', 'es', 'zh', 'ar'];
const RTL_LANGS = ['ar'];
const DEFAULT_LANG = 'en';

class I18n {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.translations = {};
    this.init();
  }

  detectLanguage() {
    // 1. Check local storage
    const saved = localStorage.getItem('arkive_lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }
    // 2. Check browser language
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }
    // 3. Fallback
    return DEFAULT_LANG;
  }

  async init() {
    await this.setLanguage(this.currentLang);
  }

  async setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;

    try {
      // Fetch JSON dictionary
      const response = await fetch(`assets/locales/${lang}.json`);
      if (!response.ok) throw new Error(`Could not load ${lang}.json`);
      
      this.translations = await response.json();
      this.currentLang = lang;
      
      // Save preference
      localStorage.setItem('arkive_lang', lang);
      
      // Update HTML attributes
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
      
      // Update DOM
      this.translatePage();
      
      // Update language switcher UI if it exists
      this.updateSwitcherUI();
      
      // Dispatch event so other scripts know translation is done
      document.dispatchEvent(new Event('i18n_ready'));
      
    } catch (error) {
      console.error("I18n Error:", error);
    }
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(key);
      
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });
  }

  getNestedTranslation(key) {
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), this.translations);
  }

  updateSwitcherUI() {
    const selector = document.getElementById('lang-selector');
    if (selector) {
      selector.value = this.currentLang;
    }
    
    // Update labels if needed
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      if (btn.dataset.langBtn === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// Initialize engine globally
window.i18n = new I18n();

// Helper to switch language from HTML
window.switchLanguage = (lang) => {
  window.i18n.setLanguage(lang);
};

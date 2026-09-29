import { t, type Lang } from '../i18n';

const STORAGE_KEY = 'tidal-lang';

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'fr';
}

function apply(lang: Lang) {
  document.documentElement.lang = lang;
  document.title = t('meta.title', lang);

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute('content', t('meta.description', lang));

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    el.textContent = t(key, lang);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (!key) return;
    el.innerHTML = t(key, lang);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt;
    if (!key) return;
    el.setAttribute('alt', t(key, lang));
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (!key) return;
    el.setAttribute('placeholder', t(key, lang));
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    if (!key) return;
    el.setAttribute('aria-label', t(key, lang));
  });

  document.querySelectorAll('[data-lang-knob]').forEach((knob) => {
    knob.classList.toggle('translate-x-4', lang === 'fr');
  });
  document.querySelectorAll('[data-lang-label="en"]').forEach((label) => {
    label.classList.toggle('opacity-80', lang === 'en');
    label.classList.toggle('opacity-35', lang === 'fr');
  });
  document.querySelectorAll('[data-lang-label="fr"]').forEach((label) => {
    label.classList.toggle('opacity-80', lang === 'fr');
    label.classList.toggle('opacity-35', lang === 'en');
  });
  document.querySelectorAll('[data-lang-toggle]').forEach((toggle) => {
    toggle.setAttribute(
      'aria-label',
      t(lang === 'en' ? 'hero.langAriaEn' : 'hero.langAriaFr', lang),
    );
  });
}

export function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const lang: Lang = isLang(saved) ? saved : 'en';
  apply(lang);

  document.addEventListener('click', (event) => {
    const toggle = (event.target as HTMLElement).closest('[data-lang-toggle]');
    if (!toggle) return;
    const next: Lang = document.documentElement.lang === 'fr' ? 'en' : 'fr';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  });
}

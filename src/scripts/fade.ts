export function initFadeIn() {
  const elements = document.querySelectorAll<HTMLElement>('[data-fade-in]');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
  );

  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      el.classList.add('is-visible');
      return;
    }
    observer.observe(el);
  });
}

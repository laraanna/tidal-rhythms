import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return lenis;

  lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    respectReducedMotion: true,
  });

  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as HTMLElement).closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== '_self') return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (!url.hash) return;
      if (!document.querySelector(url.hash)) return;

      event.preventDefault();
      const hash = url.hash;
      const toBottom = link.hasAttribute('data-scroll-bottom');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (toBottom) {
            lenis?.scrollTo('bottom', { duration: 1.4, force: true });
          } else {
            lenis?.scrollTo(hash, { duration: 1.4, force: true });
          }
          history.pushState(null, '', hash);
        });
      });
    },
    true,
  );

  return lenis;
}

export function setLenisStopped(stopped: boolean) {
  if (!lenis) return;
  if (stopped) lenis.stop();
  else lenis.start();
}

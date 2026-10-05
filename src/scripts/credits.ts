import { setLenisStopped } from './lenis';

export function initCredits() {
  const root = document.querySelector<HTMLElement>('[data-credits]');
  if (!root) return;

  const panel = root.querySelector<HTMLElement>('[data-credits-panel]');

  function setOpen(open: boolean) {
    root.classList.toggle('is-open', open);
    root.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('overflow-hidden', open);
    setLenisStopped(open);

    if (open) {
      panel?.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest(
      '[data-credits-open], [data-credits-close]',
    );
    if (!target) return;

    if (target.hasAttribute('data-credits-open')) {
      setOpen(true);
      return;
    }

    setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('is-open')) {
      setOpen(false);
    }
  });
}

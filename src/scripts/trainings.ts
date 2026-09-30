import { setLenisStopped } from './lenis';

export function initTrainings() {
  const root = document.querySelector<HTMLElement>('[data-trainings]');
  if (!root) return;

  const panel = root.querySelector<HTMLElement>('[data-trainings-panel]');

  function setOpen(open: boolean) {
    root.classList.toggle('is-open', open);
    root.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('overflow-hidden', open);
    setLenisStopped(open);
    root.scrollLeft = 0;
    root.scrollTop = 0;

    if (open) {
      panel?.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest(
      '[data-trainings-open], [data-trainings-close]',
    );
    if (!target) return;

    if (target.hasAttribute('data-trainings-open')) {
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

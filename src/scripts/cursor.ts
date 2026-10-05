import gsap from 'gsap';

const CLICKABLE =
  'a[href], button:not(:disabled), summary, select, label, [role="button"], [data-menu-open], [data-menu-close], [data-lang-toggle], [data-contact-close], [data-trainings-open], [data-trainings-close], [data-credits-open], [data-credits-close], [data-scroll-bottom], .link';

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const el = document.createElement('div');
  el.className = 'cursor-follower';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);

  gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

  const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

  let visible = false;

  window.addEventListener('mousemove', (event) => {
    if (!visible) {
      visible = true;
      gsap.set(el, { autoAlpha: 1, x: event.clientX, y: event.clientY });
    }
    xTo(event.clientX);
    yTo(event.clientY);
  });

  function isClickable(node: EventTarget | null) {
    return node instanceof Element && Boolean(node.closest(CLICKABLE));
  }

  document.addEventListener('pointerover', (event) => {
    if (isClickable(event.target) && !isClickable(event.relatedTarget)) {
      gsap.to(el, { scale: 5, duration: 0.35, ease: 'power3.out' });
    }
  });

  document.addEventListener('pointerout', (event) => {
    if (isClickable(event.target) && !isClickable(event.relatedTarget)) {
      gsap.to(el, { scale: 1, duration: 0.35, ease: 'power3.out' });
    }
  });
}

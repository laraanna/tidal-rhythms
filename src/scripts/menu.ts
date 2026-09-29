import gsap from 'gsap';
import { setLenisStopped } from './lenis';

export function initMenu() {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!menu) return;

  const left = menu.querySelector('[data-menu-left]');
  const right = menu.querySelector('[data-menu-right]');
  const header = menu.querySelector('[data-menu-header]');
  const imageDesktop = menu.querySelector('[data-menu-image-desktop]');
  const imageMobile = menu.querySelector('[data-menu-image-mobile]');
  const stagger = menu.querySelectorAll('[data-menu-stagger]');
  const video = menu.querySelector<HTMLVideoElement>('[data-menu-video]');

  const timeline = gsap.timeline({ paused: true });

  timeline
    .set(menu, { display: 'block', autoAlpha: 1, pointerEvents: 'auto' }, 0)
    .to(left, { x: 0, y: 0, duration: 0.5 }, 0)
    .to(right, { x: 0, y: 0, duration: 0.5 }, 0)
    .to(header, { opacity: 1, duration: 0.3 })
    .to(imageDesktop, { clipPath: 'inset(0px 0px 0%)', duration: 0.3 })
    .from(
      stagger,
      {
        duration: 1,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'expo.inOut',
      },
      '-=0.5',
    )
    .to(imageMobile, { clipPath: 'inset(0px 0px 0%)', duration: 0.2 })
    .reverse();

  function setOpen(open: boolean) {
    timeline.reversed(!open);
    document.body.classList.toggle('overflow-hidden', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    setLenisStopped(open);

    if (video) {
      video.muted = true;
      video.playbackRate = 0.3;
      if (open) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest('[data-menu-open], [data-menu-close], [data-menu-contact]');
    if (!target) return;

    if (target.hasAttribute('data-menu-contact')) {
      setOpen(false);
      document.querySelector('[data-contact-card]')?.classList.remove('hidden');
      return;
    }

    if (target.hasAttribute('data-menu-open')) {
      setOpen(true);
      return;
    }

    setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') {
      setOpen(false);
    }
  });
}

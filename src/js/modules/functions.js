/* Імпорти спільних модулів */
import { gsap, ScrollToPlugin } from "gsap/all.js";

/* Реєстрація модулів Green Sock */
gsap.registerPlugin(ScrollToPlugin);

/* Перевірка підтримки формату webp */
export const isWebp = () => {
  const testWebp = callback => {
    let webp = new Image();

    webp.onload = webp.onerror = () => {
      callback(webp.height == 2);
    };

    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebp(support => {
    let className = support === true ? 'webp' : 'no-webp';

    document.documentElement.classList.add(className);
  });
}

/* Рандомне число */
export const getRandom = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

/* Ширина скролл-бара */
export const getScrollbarWidth = () => {
  let documentWidth = parseInt(document.documentElement.clientWidth);
  let windowsWidth = parseInt(window.innerWidth);
  let scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
}

/* Відмінювання слів */
export const declOfNum = (number, words) => {
  return words[
    (number % 100 > 4 && number % 100 < 20)
      ? 2
      : [2, 0, 1, 1, 1, 2][(number % 10 < 5)
        ? Math.abs(number) % 10 : 5]
    ];
}

/* Відключення скролл-бару */
export const disableScrollbar = () => {
  let scrollTop =
    document.documentElement.scrollTop
      ? document.documentElement.scrollTop
      : document.body.scrollTop;

  document.documentElement.classList.add('lock-scroll')
  document.documentElement.style.top = -scrollTop + 'px';
}

/* Включення скролл-бару */
export const enableScrollbar = () => {
  let scrollTop = parseInt(document.documentElement.getBoundingClientRect().top);

  document.documentElement.classList.remove('lock-scroll');
  document.documentElement.scrollTop = -scrollTop;
  document.body.scrollTop = -scrollTop;
}

/* Fix висоти на мобільних */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const calculateMobileHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/* Аналог slideDown */
let targetHeight = 0;
export const slideDown = (target, duration, propery) => {
  target.style.display = propery || 'block';
  target.style.transition = `height ${duration}ms`;
  target.style.overflow = 'hidden';

  let height = target.clientHeight + 'px';

  let targetHeight = height;

  target.style.height = 0;

  setTimeout(() => {
    target.style.height = targetHeight;

    console.log(targetHeight);
  }, 10);
}

/* Аналог slideUp */
export const slideUp = (target, duration) => {
  let height = target.clientHeight + 'px';

  targetHeight = height;

  console.log(targetHeight)

  target.style.height = targetHeight;
  target.style.overflow = 'hidden';
  target.style.transition = `height ${duration}ms`;

  setTimeout(() => {
    target.style.height = 0;
    setTimeout( () => {
      target.style.height = '';
    }, duration);
  }, 0);

  setTimeout(() => {
    target.style.display = 'none';
  }, duration);
}

/* Аналог slideToggle */
export const slideToggle = (target, duration, propery) => {
  let display = getComputedStyle(target).display;

  if (display == 'none') {
    slideDown(target, duration, propery);
  } else {
    slideUp(target, duration);
  }
}

/* Аналог fadeIn */
export const fadeIn = (target, duration, propery) => {
  target.style.opacity = 0;
  target.style.display = propery || 'block';
  target.style.transition = `opacity ${duration}ms`;

  setTimeout(() => {
    target.style.opacity = 1;
  }, 10);
}

/* Аналог fadeOut */
export const fadeOut = (target, duration) => {
  target.style.opacity = 1;
  target.style.transition = `opacity ${duration}ms`;
  target.style.opacity = 0;

  setTimeout(() => {
    target.style.display = 'none';
  }, duration);
}

/* Аналог fadeToggle */
export const fadeToggle = (target, duration, propery) => {
  let display = getComputedStyle(target).display;

  if (display == 'none') {
    fadeIn(target, duration, propery);
  } else {
    fadeOut(target, duration);
  }
}

/* Скролл до якоря */
export const anchorScroll = (scrolledTarget, scrollToTargetId, duration) => {
  gsap.to(scrolledTarget, {
    duration: duration,
    ease: "Expo.easeInOut",
    scrollTo: scrollToTargetId
  });
}
// ===== Бургер-меню =====
const burger = document.querySelector('.header__burger');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('nav--open');
  burger.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', outsideClickHandler);
}

function outsideClickHandler(e) {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
}

burger?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  burger.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) document.addEventListener('click', outsideClickHandler);
});

// ===== Плавный скролл =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
        history.pushState(null, '', id);
      }
    }
  });
});

// ===== Подсветка активного пункта =====
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = new Map(
  [...document.querySelectorAll('.nav__link')].map(l => [l.getAttribute('href'), l])
);

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = navLinks.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link--active').forEach(el => el.classList.remove('nav__link--active'));
      link.classList.add('nav__link--active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(s => io.observe(s));

// ===== Фильтрация портфолио по тегам (опционально) =====
const filterButtons = document.querySelectorAll('.portfolio__filters .tag');
const cards = document.querySelectorAll('.portfolio__grid .card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => { b.classList.remove('tag--active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('tag--active'); btn.setAttribute('aria-pressed', 'true');

    const val = btn.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const visible = val === 'all' || tags.includes(val);
      card.style.display = visible ? '' : 'none';
      card.classList.toggle('card--hidden', !visible);
    });
  });
});

// ===== Переключатель темы (опционально, с localStorage) =====
const THEME_KEY = 'pref-theme';
const root = document.documentElement;
const themeBtn = document.querySelector('[data-theme-toggle]');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn?.setAttribute('aria-pressed', String(theme === 'dark'));
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }
})();

themeBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// ===== Год в футере =====
document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
const rio = new IntersectionObserver(es => {
  es.forEach(e => e.isIntersecting && e.target.classList.add('is-inview'));
},{ threshold: 0.08 });
revealEls.forEach(el => rio.observe(el));

// ===== Hero: появление при скролле =====
(() => {
  const el = document.querySelector('[data-js-scroll-effect]');
  if (!el) return;
  const observer = new IntersectionObserver(([entry]) => {
    entry.target.classList.toggle('is-inview', entry.isIntersecting);
  }, { threshold: 0.25 });
  observer.observe(el);
})();

// ===== Hero: ванильный слайдер значков =====
(() => {
  const root = document.querySelector('[data-js-slider]');
  if (!root) return;

  const track = root.querySelector('[data-js-slider-track]');
  const prev  = root.querySelector('.hero-slider__button--prev');
  const next  = root.querySelector('.hero-slider__button--next');

  let offset = 0;

  function stepWidth() {
    const first = track.firstElementChild;
    const gap = 8; // тот же gap, что в CSS
    return (first?.offsetWidth || 80) + gap;
  }

  function slide(dir = 1) {
    const first = track.firstElementChild;
    const last  = track.lastElementChild;
    const step  = stepWidth();

    offset += dir * step;
    track.style.transform = `translateX(${-offset}px)`;

    // бесшовная лента
    if (dir > 0 && offset > step * 2) {
      track.append(first);
      offset -= step;
      track.style.transform = `translateX(${-offset}px)`;
    } else if (dir < 0 && offset < 0) {
      track.prepend(last);
      offset += step;
      track.style.transform = `translateX(${-offset}px)`;
    }
  }

  let timer = setInterval(slide, 1800);
  root.addEventListener('pointerenter', () => clearInterval(timer));
  root.addEventListener('pointerleave', () => (timer = setInterval(slide, 1800)));

  prev?.addEventListener('click', () => slide(-1));
  next?.addEventListener('click', () => slide(1));

  // на всякий случай пересчёт после ресайза
  window.addEventListener('resize', () => {
    track.style.transform = 'translateX(0)';
    offset = 0;
  });
})();



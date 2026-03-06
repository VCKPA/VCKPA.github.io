// ── Split Text Animation ────────────────────────
document.querySelectorAll('.split-text').forEach((el, lineIdx) => {
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${0.4 + lineIdx * 0.2 + i * 0.04}s`;
    el.appendChild(span);
  });
});

// ── Magnetic Elements ───────────────────────────
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// ── Nav scroll ──────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile menu ─────────────────────────────────
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
});

menu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
  });
});

// ── Fluid Carousel ──────────────────────────────
const cWrap = document.getElementById('carouselWrap');
const cards = document.querySelectorAll('.ccard');
const dots = document.querySelectorAll('.orbit-dot');
const totalCards = cards.length;
let currentCard = -1;

function setActiveCard(index) {
  if (index === currentCard) return;
  currentCard = index;

  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');
    if (i === index) {
      card.classList.add('active');
    } else if (i === index - 1 || (index === 0 && i === totalCards - 1)) {
      card.classList.add('prev');
    } else if (i === index + 1 || (index === totalCards - 1 && i === 0)) {
      card.classList.add('next');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function updateCarousel() {
  if (!cWrap) return;

  const wrapTop = cWrap.offsetTop;
  const wrapHeight = cWrap.offsetHeight;
  const viewH = window.innerHeight;
  const scrollableDistance = wrapHeight - viewH;
  const scrolled = window.scrollY - wrapTop;
  const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

  const slideIndex = Math.min(
    totalCards - 1,
    Math.floor(progress * totalCards)
  );

  setActiveCard(slideIndex);
}

window.addEventListener('scroll', updateCarousel, { passive: true });
setActiveCard(0);

// ── Parallax on scroll ──────────────────────────
const parallaxEls = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const offset = (center - window.innerHeight / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

// ── Scroll reveal ───────────────────────────────
const revealEls = document.querySelectorAll(
  '.about-grid, .about-headline, .about-body, .about-details, ' +
  '.section-header:not(.carousel-header), .spotify-container, .contact-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

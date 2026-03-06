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

// ── Horizontal Scroll-Lock ──────────────────────
const hWrap = document.getElementById('hscrollWrap');
const hTrack = document.getElementById('hscrollTrack');
const hCurrent = document.getElementById('hscrollCurrent');
const hProgress = document.getElementById('hscrollProgress');
const slides = document.querySelectorAll('.hscroll-slide');
const totalSlides = slides.length;

function updateHScroll() {
  if (!hWrap) return;

  const wrapTop = hWrap.offsetTop;
  const wrapHeight = hWrap.offsetHeight;
  const viewH = window.innerHeight;
  const scrollableDistance = wrapHeight - viewH;
  const scrolled = window.scrollY - wrapTop;
  const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

  // Which slide are we on
  const slideIndex = Math.min(
    totalSlides - 1,
    Math.floor(progress * totalSlides)
  );

  // Smooth translate
  const translateX = progress * (totalSlides - 1) * -100;
  const clampedX = Math.max(-(totalSlides - 1) * 100, Math.min(0, translateX));
  hTrack.style.transform = `translateX(${clampedX}vw)`;

  // Update counter
  hCurrent.textContent = String(slideIndex + 1).padStart(2, '0');

  // Update progress bar
  hProgress.style.width = `${((slideIndex + 1) / totalSlides) * 100}%`;
}

window.addEventListener('scroll', updateHScroll, { passive: true });
updateHScroll();

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
  '.section-header, .spotify-container, .contact-inner'
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

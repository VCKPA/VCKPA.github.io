// ── Custom Cursor ───────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorDot.style.left = cursorX + 'px';
  cursorDot.style.top = cursorY + 'px';
  cursor.classList.add('visible');
  cursorDot.classList.add('visible');
});

document.addEventListener('mouseleave', () => {
  cursor.classList.remove('visible');
  cursorDot.classList.remove('visible');
});

function animateCursor() {
  ringX += (cursorX - ringX) * 0.15;
  ringY += (cursorY - ringY) * 0.15;
  cursor.style.left = ringX + 'px';
  cursor.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .hoverable').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorDot.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorDot.classList.remove('hovering');
  });
});

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
  '.section-header, .spotify-container, .contact-inner, .work-scroll'
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

// ── Sketch draw-on-scroll ──────────────────────
const sketches = document.querySelectorAll('.sketch');

const sketchObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('drawn');
      sketchObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

sketches.forEach(el => sketchObserver.observe(el));

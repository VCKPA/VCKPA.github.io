// ── Mobile menu ─────────────────────────────────
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');

if (toggle && menu) {
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
}

// ── Filter ──────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    items.forEach((item, i) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
      if (match) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 60);
      }
    });
  });
});

// ── Lightbox ────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function getVisibleItems() {
  return [...document.querySelectorAll('.gallery-item:not(.hidden)')];
}

function openLightbox(index) {
  const visible = getVisibleItems();
  if (index < 0 || index >= visible.length) return;
  currentIndex = index;

  const item = visible[index];
  const img = item.querySelector('.gallery-img');
  const caption = item.querySelector('.gallery-caption').textContent;
  const meta = item.querySelector('.gallery-meta').textContent;

  lightboxContent.innerHTML = '';
  const clone = img.cloneNode(true);
  lightboxContent.appendChild(clone);
  lightboxCaption.textContent = caption;
  lightboxMeta.textContent = meta;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  const visible = getVisibleItems();
  currentIndex = (currentIndex + dir + visible.length) % visible.length;
  openLightbox(currentIndex);
}

items.forEach(item => {
  item.addEventListener('click', () => {
    const visible = getVisibleItems();
    const index = visible.indexOf(item);
    if (index !== -1) openLightbox(index);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigate(-1));
lightboxNext.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// ── Scroll reveal ───────────────────────────────
const revealEls = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
  observer.observe(el);
});

/* ============================================================
   HOME PAGE JAVASCRIPT — Summit & Stays
   ============================================================ */

// ── HERO PARTICLES ──
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      opacity: ${Math.random() * 0.6 + 0.1};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
})();

// ── SEARCH TABS ──
let currentSearchType = 'trek';
function switchTab(type) {
  currentSearchType = type;
  document.getElementById('tab-trek').classList.toggle('active', type === 'trek');
  document.getElementById('tab-villa').classList.toggle('active', type === 'villa');
}

function handleSearch() {
  const dest = document.getElementById('search-dest').value;
  const date = document.getElementById('search-date').value;
  if (!dest) { showToast('Please select a destination', 'error'); return; }
  const page = currentSearchType === 'trek' ? 'treks.html' : 'villas.html';
  showToast(`Searching ${currentSearchType}s in ${dest}...`, 'info');
  setTimeout(() => window.location.href = page, 1000);
}

// ── TESTIMONIALS SLIDER ──
let currentSlide = 0;
const track = document.getElementById('testimonials-track');
const dots = document.querySelectorAll('.test-dot');
const totalSlides = 4;
let autoSlideTimer;

function updateSlider() {
  if (!track) return;
  const cardWidth = track.children[0]?.offsetWidth + 24 || 0;
  const offset = currentSlide * cardWidth;
  track.style.transform = `translateX(-${offset}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function slideTestimonial(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function goToSlide(idx) {
  currentSlide = idx;
  updateSlider();
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => slideTestimonial(1), 5000);
}

if (track) {
  resetAutoSlide();
  window.addEventListener('resize', updateSlider);
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    if (!name || !email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const btn = document.getElementById('contact-submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      showToast('Message sent! We\'ll reply within 24 hours 🎉', 'success');
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1800);
  });
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   SHARED JAVASCRIPT — Summit & Stays
   ============================================================ */

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ── SCROLL REVEAL ──
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}
initReveal();

// ── TOAST NOTIFICATION ──
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icons = { success: '✅', error: '❌', info: '💬' };
  toast.innerHTML = `${icons[type] || '💬'} ${message}`;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 3500);
}

// ── TOGGLE LIKE ──
function toggleLike(el) {
  if (el.textContent === '🤍') {
    el.textContent = '❤️';
    showToast('Added to wishlist!', 'success');
  } else {
    el.textContent = '🤍';
    showToast('Removed from wishlist', 'info');
  }
}

// ── CLOSE MODAL ──
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

// ── STATS COUNTER ANIMATION ──
function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.target);
        const isDecimal = target % 1 !== 0;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
        }, 16);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
animateCounters();

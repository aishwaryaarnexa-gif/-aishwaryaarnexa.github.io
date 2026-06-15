/* ====================================================
   TrekX Adventures — app.js
   Interactions, Animations, and Utilities
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =======================================
  // 1. NAVBAR — Scroll & Hamburger
  // =======================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // =======================================
  // 2. HERO PARTICLES
  // =======================================
  const heroParticles = document.getElementById('hero-particles');
  if (heroParticles) {
    const PARTICLE_COUNT = 28;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.setProperty('--dur', (4 + Math.random() * 5) + 's');
      p.style.setProperty('--delay', (Math.random() * 6) + 's');
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = Math.random() * 0.7;
      heroParticles.appendChild(p);
    }
  }

  // =======================================
  // 3. COUNTER ANIMATION
  // =======================================
  const counters = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, target);
        counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }

  // =======================================
  // 4. INTERSECTION OBSERVER — Reveal + Counters
  // =======================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counter trigger on hero-stats visibility
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  // =======================================
  // 5. ADD REVEAL CLASSES TO SECTIONS
  // =======================================
  function addRevealToElements() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(el => el.classList.add('reveal'));

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = (i * 0.1) + 's';
    });

    const trekCards = document.querySelectorAll('.trek-card');
    trekCards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = (i * 0.12) + 's';
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = (i * 0.12) + 's';
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, i) => {
      item.classList.add('reveal');
      item.style.transitionDelay = (i * 0.08) + 's';
    });

    const expItems = document.querySelectorAll('.exp-item');
    expItems.forEach((item, i) => {
      item.classList.add('reveal');
      item.style.transitionDelay = (i * 0.1) + 's';
    });

    const aboutVisual = document.getElementById('about-visual');
    const aboutContent = document.getElementById('about-content');
    if (aboutVisual) aboutVisual.classList.add('reveal-left');
    if (aboutContent) aboutContent.classList.add('reveal-right');

    const contactInfo = document.getElementById('contact-info');
    const contactForm = document.getElementById('contact-form-wrap');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactForm) contactForm.classList.add('reveal-right');

    const finalCtaContent = document.getElementById('final-cta-content');
    if (finalCtaContent) finalCtaContent.classList.add('reveal');

    // Re-observe newly added elements
    const newRevealEls = document.querySelectorAll('.reveal:not([data-observed]), .reveal-left:not([data-observed]), .reveal-right:not([data-observed])');
    newRevealEls.forEach(el => {
      el.setAttribute('data-observed', 'true');
      revealObserver.observe(el);
    });
  }

  addRevealToElements();

  // =======================================
  // 6. GALLERY LIGHTBOX
  // =======================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // =======================================
  // 7. CONTACT FORM
  // =======================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const btnText = document.getElementById('btn-text');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1800));

      contactForm.style.opacity = '0';
      contactForm.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        formSuccess.classList.add('visible');
      }, 300);
    });

    // Real-time input animation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }

  // =======================================
  // 8. SMOOTH SCROLLING FOR ANCHOR LINKS
  // =======================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // =======================================
  // 9. ACTIVE NAV LINK HIGHLIGHT
  // =======================================
  const sections = document.querySelectorAll('section[id]');

  const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => navHighlightObserver.observe(section));

  // Active nav link style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.nav-link.active { color: var(--primary) !important; background: rgba(34, 197, 94, 0.08) !important; }`;
  document.head.appendChild(navStyle);

  // =======================================
  // 10. PARALLAX HERO IMAGE
  // =======================================
  const heroBgImg = document.getElementById('hero-bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.08) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // =======================================
  // 11. SERVICE CARD TILT EFFECT
  // =======================================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // =======================================
  // 12. TREK CARD TILT EFFECT
  // =======================================
  const trekCards = document.querySelectorAll('.trek-card');
  trekCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // =======================================
  // 13. SCROLL TO TOP ON LOGO CLICK
  // =======================================
  const navLogoLink = document.getElementById('nav-logo-link');
  if (navLogoLink) {
    navLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =======================================
  // 14. HERO SCROLL INDICATOR FADE
  // =======================================
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = Math.max(0, 1 - window.scrollY / 200);
    }, { passive: true });
  }

  console.log('%cTrekX Adventures 🏔', 'color: #22c55e; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with passion for adventure lovers!', 'color: #86efac; font-size: 12px;');
});

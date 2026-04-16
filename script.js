/* =============================================
   DRAIN DOCTOR — JAVASCRIPT
   ============================================= */

(function () {
  'use strict';

  /* ---- Scroll Progress Bar ---- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  /* ---- Navbar scroll state ---- */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    progressBar.style.width = docH > 0 ? (scrollY / docH * 100) + '%' : '0%';

    // Navbar
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial call

  /* ---- Mobile Nav ---- */
  const hamburger        = document.getElementById('hamburger');
  const mobileNav        = document.getElementById('mobile-nav');
  const mobileNavClose   = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger)        hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose)   mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Close on mobile link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---- Scroll Animations (Intersection Observer) ---- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children of grids
          const card = entry.target;
          const siblings = card.parentElement?.querySelectorAll('[data-animate]');
          let delay = 0;
          if (siblings && siblings.length > 1) {
            siblings.forEach((sib, idx) => {
              if (sib === card) delay = idx * 90;
            });
          }
          setTimeout(() => card.classList.add('visible'), delay);
          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Smooth anchor scrolling ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navH   = navbar.offsetHeight;
        const offsetY = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: offsetY, behavior: 'smooth' });
      }
    });
  });

  /* ---- Contact Form ---- */
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const form  = document.getElementById('contact-form');
    const name  = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const issue = document.getElementById('form-issue').value;

    if (!name || !phone || !issue) {
      showFormFeedback('Please fill in all fields.', 'error');
      return;
    }

    const issueLabels = {
      'blocked-drain': 'Blocked Drain',
      'burst-pipe':    'Burst Pipe',
      'leak':          'Water Leak',
      'geyser':        'Geyser Problem',
      'coc':           'COC Certificate',
      'emergency':     'Emergency',
      'other':         'General Enquiry'
    };

    const issueText = issueLabels[issue] || issue;
    const message   = `Hi Drain Doctor,%0A%0AMy name is ${encodeURIComponent(name)}.%0APhone: ${encodeURIComponent(phone)}%0AIssue: ${encodeURIComponent(issueText)}%0A%0APlease call me back as soon as possible. Thank you!`;

    window.open(`https://wa.me/27000000000?text=${message}`, '_blank', 'noopener');

    showFormFeedback('Opening WhatsApp... We\'ll get back to you ASAP! 💬', 'success');
    setTimeout(() => form.reset(), 2000);
  };

  function showFormFeedback(msg, type) {
    let feedback = document.getElementById('form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.id = 'form-feedback';
      feedback.style.cssText = `
        margin-top: 16px;
        padding: 12px 18px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
      `;
      document.getElementById('form-submit').after(feedback);
    }

    feedback.textContent = msg;
    feedback.style.background = type === 'success'
      ? 'rgba(0,194,168,.12)'
      : 'rgba(239,68,68,.1)';
    feedback.style.color = type === 'success' ? '#009d88' : '#dc2626';
    feedback.style.border = `1px solid ${type === 'success' ? 'rgba(0,194,168,.3)' : 'rgba(239,68,68,.3)'}`;

    setTimeout(() => {
      if (feedback) feedback.style.opacity = '0';
      setTimeout(() => { if (feedback) feedback.remove(); }, 500);
    }, 4000);
  }

  /* ---- Service card stagger on hover ---- */
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 30}ms`;
  });

  /* ---- WhatsApp float pulse after delay ---- */
  const waFloat = document.getElementById('whatsapp-float');
  if (waFloat) {
    setTimeout(() => {
      waFloat.style.animation = 'none';
      waFloat.style.opacity   = '1';
      waFloat.style.transform = 'none';
    }, 2500);
  }

  /* ---- Hero scroll hint fade ---- */
  const scrollHint = document.getElementById('hero-scroll');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }

  /* ---- Counter animation for stats ---- */
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(el => {
          const text    = el.textContent.trim();
          const numMatch = text.match(/\d+/);
          const suffix  = text.replace(/\d+/, '');
          if (numMatch) {
            animateCounter(el, parseInt(numMatch[0]), suffix);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const solutionCard = document.getElementById('solution-card');
  if (solutionCard) statsObserver.observe(solutionCard);

  /* ---- Hero Carousel ---- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  const slideInterval = 6000; // 6 seconds per slide

  function nextSlide() {
    if (!heroSlides.length) return;
    
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }

  if (heroSlides.length > 1) {
    setInterval(nextSlide, slideInterval);
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  console.log('%c💧 Drain Doctor — Premium Website Loaded', 'color:#00C2A8;font-weight:800;font-size:14px;');
})();

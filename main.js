/* ============================================================
   AVANTEC MEDIA — main.js
   Vanilla JS — no dependencies
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll behaviour + hamburger menu
============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  // Scroll: add .scrolled class when past 60px
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Hamburger toggle
  function toggleMenu(forceClose = false) {
    const isOpen = hamburger.classList.contains('open') && !forceClose;
    hamburger.classList.toggle('open', !isOpen);
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('hidden', isOpen);
  }

  hamburger.addEventListener('click', () => toggleMenu());

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      toggleMenu(true);
      hamburger.focus();
    }
  });
})();


/* ============================================================
   2. YEAR — auto-update copyright year
============================================================ */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   3. SCROLL REVEAL — fade in sections as they enter viewport
============================================================ */
(function initScrollReveal() {
  // Add .reveal class to all major section children
  const targets = document.querySelectorAll(
    '.service-card, .package-card, .portfolio-item, #about .grid > *, #contact-form'
  );

  targets.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    // Fallback: just make everything visible
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  });

  targets.forEach(el => observer.observe(el));
})();


/* ============================================================
   4. CONTACT FORM — client validation + Formspree submission
============================================================ */
(function initContactForm() {
  const form       = document.getElementById('contact-form');
  const statusEl   = document.getElementById('form-status');
  const submitBtn  = document.getElementById('submit-btn');

  if (!form) return;

  function setStatus(type, message) {
    statusEl.textContent = message;
    statusEl.className = type; // 'success' or 'error'
  }

  function clearStatus() {
    statusEl.textContent = '';
    statusEl.className = 'hidden';
  }

  // Simple client-side validation
  function validate() {
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) return 'Please enter your full name.';
    if (!email || !emailRe.test(email)) return 'Please enter a valid email address.';
    if (!service) return 'Please select a service you\'re interested in.';
    return null; // valid
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    const error = validate();
    if (error) {
      setStatus('error', error);
      return;
    }

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setStatus('success', '✓ Message sent! We\'ll be in touch within one business day.');
        form.reset();
      } else {
        const json = await response.json().catch(() => ({}));
        const msg = json?.errors?.map(e => e.message).join(', ') || 'Something went wrong. Please try again.';
        setStatus('error', msg);
      }
    } catch (err) {
      setStatus('error', 'Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
})();


/* ============================================================
   5. PAYMENT BUTTONS — placeholder handlers
   Replace these with your actual Stripe payment links
   or Stripe.js integration when ready
============================================================ */
(function initPaymentButtons() {
  // Map package names to their Stripe Payment Link URLs
  // Create these at: dashboard.stripe.com → Payment Links
  const STRIPE_LINKS = {
    essential:  'https://buy.stripe.com/YOUR_ESSENTIAL_LINK',
    signature:  'https://buy.stripe.com/YOUR_SIGNATURE_LINK',
    pinnacle:   'https://buy.stripe.com/YOUR_PINNACLE_LINK',
  };

  const payButtons = document.querySelectorAll('.pay-btn');

  payButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Determine which package based on aria-label
      const label = btn.getAttribute('aria-label') || '';
      let packageKey = 'essential';

      if (label.toLowerCase().includes('signature')) packageKey = 'signature';
      if (label.toLowerCase().includes('pinnacle'))  packageKey = 'pinnacle';

      const url = STRIPE_LINKS[packageKey];

      // Once you've added real Stripe links, this will redirect
      if (url && !url.includes('YOUR_')) {
        window.open(url, '_blank', 'noopener noreferrer');
      } else {
        // Development placeholder alert — remove before launch
        alert(
          `Stripe not yet configured.\n\n` +
          `To activate:\n` +
          `1. Create a Stripe account at stripe.com\n` +
          `2. Go to Payment Links and create a link for each package\n` +
          `3. Paste the URL into STRIPE_LINKS in main.js`
        );
      }
    });
  });
})();


/* ============================================================
   6. SMOOTH SCROLL — enhance native scroll-smooth for older browsers
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   7. CONTACT OBFUSCATION — decode email, phone + address at runtime
============================================================ */
(function initContactObfuscation() {
  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      );
    });
  }

  // ROT13 encoded values:
  // Email:   "info@avantecmedia.com"  → "vasb@ninagrepzrqvn.pbz"
  // Phone:   "+1 (727) 435-5663"
  // Address: "7901 4th St N<br />Suite 300<br />St Petersburg, FL 33702"
  const encoded = {
    email:   'vasb@ninagrecmrqvn.pbz',
    phone:   '+1 (727) 435-5663',
    address: '7901 4gu Fg A<oe />Fhvgr 300<oe />Fg Crgrefohet, SY 33702'
  };

  // Email
  const emailEl = document.getElementById('footer-email');
  if (emailEl) {
    const decoded = rot13(encoded.email);
    emailEl.textContent = decoded;
    emailEl.href = 'mailto:' + decoded;
  }

  // Phone
  const phoneEl = document.getElementById('footer-phone');
  if (phoneEl) {
    const decoded = rot13(encoded.phone);
    phoneEl.textContent = decoded;
    phoneEl.href = 'tel:+' + decoded.replace(/\D/g, '');
  }

  // Address
  const addressEl = document.getElementById('footer-address');
  if (addressEl) {
    addressEl.innerHTML = rot13(encoded.address);
  }
})();
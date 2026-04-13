// Utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Update Year in footer
$('#current-year').textContent = new Date().getFullYear();

// Header Scroll Effect
const header = $('#site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.add('scrolled');
    // We want the hero area to look clear, but since nav is white, we might want backgrounds.
    // Let's actually only add 'scrolled' if scrollY > 50
    if (window.scrollY <= 50) {
      header.classList.remove('scrolled');
    }
  }
});

// Mobile Menu Toggle
const menuToggle = $('.menu-toggle');
const mobileNav = $('.mobile-nav');
const mobileLinks = $$('.mobile-nav-links a');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('open');
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('open');
  });
});

// FAQ Accordion
const faqItems = $$('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = btn.querySelector('.icon');
  
  btn.addEventListener('click', () => {
    const isOpen = answer.style.maxHeight;
    
    // Close all others
    $$('.faq-answer').forEach(ans => ans.style.maxHeight = null);
    $$('.faq-question .icon').forEach(ic => ic.textContent = '+');
    
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = '-';
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

$$('.fade-in-section').forEach(section => {
  observer.observe(section);
});

// Exit Intent Modal
let modalShown = false;
const exitModal = $('#exit-modal');
const closeModalBtn = $('.close-modal');

const showModal = () => {
  if (!modalShown) {
    exitModal.classList.add('show');
    modalShown = true;
    sessionStorage.setItem('exitModalShown', 'true');
  }
};

const closeModal = () => {
  exitModal.classList.remove('show');
};

// Check if already shown in this session
if (!sessionStorage.getItem('exitModalShown')) {
  // Listen for mouseout event to detect exit intent
  document.addEventListener('mouseout', (e) => {
    if (e.clientY < 50 && e.relatedTarget == null) {
      showModal();
    }
  });

  // Fallback for mobile (show after 30 seconds if not already shown)
  setTimeout(() => {
    if (!modalShown) {
      showModal();
    }
  }, 30000);
}

closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === exitModal) {
    closeModal();
  }
});

// ==========================================================
// Menu mobile (burger)
// ==========================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Ferme le menu quand on clique un lien (utile en mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================================
// Formulaire de contact — retour visuel simple
// (Web3Forms gère l'envoi réel ; ce script gère juste le message affiché)
// ==========================================================
const contactForm = document.querySelector('.contact-form');
const formNote = document.getElementById('form-note');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formNote.textContent = 'Envoi en cours…';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();

      if (result.success) {
        formNote.textContent = 'Message envoyé, merci ! Réponse sous 24-48h.';
        contactForm.reset();
      } else {
        formNote.textContent = "Une erreur est survenue, merci d'appeler directement.";
      }
    } catch (err) {
      formNote.textContent = "Une erreur est survenue, merci d'appeler directement.";
    }
  });
}

// ==========================================================
// Année automatique dans le footer
// ==========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==========================================================
// Apparition douce des sections au scroll
// (désactivée si l'utilisateur préfère moins d'animations)
// ==========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('section > .container');
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
}

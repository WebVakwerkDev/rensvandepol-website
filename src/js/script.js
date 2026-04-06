'use strict';

// ── Year ──────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll state ───────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu ───────────────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
}

window.closeMobileMenu = closeMobileMenu;

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
}, { passive: true });

// ── Hero entrance ─────────────────────────────────────────
// Triggered by timeout, not IntersectionObserver, so it always runs.
window.addEventListener('DOMContentLoaded', () => {
    const heroEls = document.querySelectorAll('.hero-reveal');
    heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 + i * 20);
    });
});

// ── Scroll reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── WhatsApp booking ──────────────────────────────────────
function handleBooking() {
    const msg = encodeURIComponent('Hoi, ik wil graag een afspraak maken. Wanneer heb je tijd?');
    window.open(`https://wa.me/31628293223?text=${msg}`, '_blank', 'noopener,noreferrer');
}

window.handleBooking = handleBooking;

// ── Scroll to services ────────────────────────────────────
function scrollToServices() {
    const el = document.getElementById('diensten');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

window.scrollToServices = scrollToServices;

// ── Anchor smooth scroll ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

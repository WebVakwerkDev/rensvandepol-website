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
    navToggle.setAttribute('aria-expanded', isOpen);
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
// One timeout — CSS transition-delay handles the stagger per element.
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero-reveal').forEach(el => el.classList.add('visible'));
    }, 80);
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

// ── Active nav link on scroll ─────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active',
                    link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-35% 0px -60% 0px' });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

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

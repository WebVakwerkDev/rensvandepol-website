// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Handle booking via WhatsApp
function handleBooking() {
    window.open('https://wa.me/31628293223?text=Ik wil een afspraak maken, wanneer heb je tijd', '_blank');
}

// Handle WhatsApp message
function handleWhatsApp() {
    window.open('https://wa.me/31628293223?text=Ik wil een afspraak maken, wanneer heb je tijd?', '_blank');
}

// Smooth scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('diensten');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

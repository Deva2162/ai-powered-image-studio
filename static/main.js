// New addition: Dynamic logo movement on hover – add this to the end of main.js

const logo = document.querySelector('.creator-logo');
const header = document.querySelector('.header');

logo.addEventListener('mouseenter', () => {
    // Get dimensions of the header and logo
    const headerRect = header.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();
    
    // Calculate a random position within the header (with margins to avoid edges)
    const maxX = headerRect.width - logoRect.width - 20;
    const maxY = headerRect.height - logoRect.height - 20;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Reposition the logo randomly
    logo.style.left = `${randomX}px`;
    logo.style.top = `${randomY}px`;
    logo.style.right = 'auto'; // Resets the CSS right positioning for dynamic placement
});
// JavaScript for scroll-triggered animations and interactivity
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Optional: Add a subtle scroll effect to the header (parallax-like)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            header.style.transform = `translateY(${scrollY * 0.1}px)`; // Subtle parallax
        } else {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            header.style.transform = 'translateY(0)';
        }
    });

    // Add hover effect for file inputs (optional enhancement)
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            this.style.borderColor = '#007bff';
        });
        input.addEventListener('mouseleave', function() {
            this.style.borderColor = '#ddd';
        });
    });
});
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
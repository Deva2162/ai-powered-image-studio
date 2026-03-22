// Scroll Animations + UI Enhancements
document.addEventListener('DOMContentLoaded', function () {

    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');

    // Intersection Observer Options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    // Observer Callback
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stop observing after animation (performance boost)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe Sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Header Scroll Effect (Enhanced)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth Fade-in for Page Load
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);

    // Optional: Button Click Animation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });

});

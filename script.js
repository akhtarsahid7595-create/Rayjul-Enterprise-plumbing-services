// Rayjul Plumbing - Interactivity & Polish

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon between Menu and X if needed, for simplicity let's just toggle class
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons(); // Re-render icon
            }
        });

        // Close menu when clicking a link (for mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- 2. Sticky Header Effect ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // --- 3. WhatsApp Message Pre-fill (Dynamic fallback check) ---
    // Links already contain pre-fill in HTML, but can add dynamic triggers here if needed.

    // --- 4. Micro-animations on Scroll (Optional but Premium) ---
    // Simple Intersection Observer for entry animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements for reveal animation
    const revealElements = document.querySelectorAll('.service-card, .why-content, .why-image, .cta-inner');
    revealElements.forEach(el => {
        el.classList.add('reveal-item'); // CSS class for base state
        observer.observe(el);
    });

});
/* 
Style update needed in style.css for reveal animations:
.reveal-item { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-item.visible { opacity: 1; transform: translateY(0); }
*/

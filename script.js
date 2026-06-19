const pageContent = document.querySelector('.page-content');

document.addEventListener("DOMContentLoaded", function() {
    
    // UI/UX Animation Engine: Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    // Navigation Ecosystem & Responsive Menu Engine
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');
    const overlayLinks = document.querySelectorAll('.menu-overlay-links a');
    const hero = document.getElementById('hero'); 
    
    let isMenuOpen = false;
    let menuOpenScrollY = 0;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        nav.classList.toggle('menu-open');
        if (pageContent) pageContent.classList.toggle('menu-active');
    
        
        if (isMenuOpen) {
            menuOpenScrollY = window.scrollY;
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    // Close the menu if the user clicks the pushed-back page content
if (pageContent) {
    pageContent.addEventListener('click', (e) => {
        // Only trigger if the menu is actually open
        if (isMenuOpen) {
            e.preventDefault(); // Stops the click from activating any cards underneath
            toggleMenu(); // Safely closes the menu
        }
    });
}


    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    // Unified Scroll Animation Matrix
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                // Navbar Transform Dynamics
                if (currentScrollY > 50) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }

                // Autoclose Responsive Drawer thresholds
                if (isMenuOpen && Math.abs(currentScrollY - menuOpenScrollY) > 60) {
                    toggleMenu();
                }

                // Balanced Parallax Calculations
                if (currentScrollY <= window.innerHeight && hero) {
                    hero.style.transform = `translate3d(0, ${currentScrollY * 0.35}px, 0)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Native Architectural Anchor Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

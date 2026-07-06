document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Remove Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hide');
    }, 1200);

    // 2. Magnetic UI Elements (Keep for high-end feel on desktop)
    const magnetics = document.querySelectorAll('.magnetic');
    
    // Only apply magnetic effect if it's not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const position = btn.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = "translate(0px, 0px)";
            });
        });
    }

    // 3. Scroll Reveal Animations (Intersection Observer)
    const textReveals = document.querySelectorAll('.reveal-text');
    textReveals.forEach(text => {
        let content = text.innerHTML;
        text.innerHTML = `<span>${content}</span>`;
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-text').forEach(el => {
        observer.observe(el);
    });

    // 4. Mobile Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');

    if(hamburger) {
        // Toggle menu open/close
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            nav.classList.toggle('menu-open');
        });

        // Close menu automatically when a link is clicked
        const mobileLinks = document.querySelectorAll('.nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                nav.classList.remove('menu-open');
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Custom Sketch Cursor Logic
    const cursor = document.querySelector('.cursor-dot');
    
    // Only run custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Expand cursor on clickable items
        const clickables = document.querySelectorAll('a, button, .sketch-box');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // 2. 3D Tilt Physics for Sketch Boxes
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        tiltCards.forEach(card => {
            const content = card.querySelector('.tilt-content');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Exaggerated physical tilt
                const rotateX = ((y - centerY) / centerY) * -15; 
                const rotateY = ((x - centerX) / centerX) * 15;
                
                content.style.transform = `translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Snap back to original sketchy state
                content.style.transform = `translateZ(20px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    }

    // 3. Background Parallax Doodles
    const doodles = document.querySelectorAll('.parallax');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        doodles.forEach(doodle => {
            const speed = doodle.getAttribute('data-speed');
            const x = mouseX * speed * 50;
            const y = mouseY * speed * 50;
            doodle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 4. Bouncy Scroll Reveals (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bounce-in').forEach(el => {
        observer.observe(el);
    });

    // 5. Mobile Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if(navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        const mobileLinks = document.querySelectorAll('.nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
});
// Advanced animation system
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeInUpElements = document.querySelectorAll('.fade-in-up');
    const fadeInDownElements = document.querySelectorAll('.fade-in-down');
    const fadeInLeftElements = document.querySelectorAll('.fade-in-left');
    const fadeInRightElements = document.querySelectorAll('.fade-in-right');
    const zoomInElements = document.querySelectorAll('.zoom-in');

    // Animation options
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    // Generic animation observer
    const createObserver = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, animationOptions);

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Apply observers to animation groups
    createObserver(fadeInElements, 'animated');
    createObserver(fadeInUpElements, 'animated');
    createObserver(fadeInDownElements, 'animated');
    createObserver(fadeInLeftElements, 'animated');
    createObserver(fadeInRightElements, 'animated');
    createObserver(zoomInElements, 'animated');

    // Staggered animations for grids
    const staggerGrids = document.querySelectorAll('.stagger-grid');
    staggerGrids.forEach(grid => {
        const items = grid.children;
        const staggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 100 * index);
                });
                staggerObserver.unobserve(grid);
            }
        }, animationOptions);
        
        staggerObserver.observe(grid);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                
                let count = 0;
                const updateCounter = () => {
                    const increment = countTo / 100;
                    
                    if (count < countTo) {
                        count += increment;
                        target.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 10);
                    } else {
                        target.textContent = countTo;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Typing effect with cursor for hero heading
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        const originalText = heroHeading.textContent;
        heroHeading.innerHTML = '<span class="typing-text"></span><span class="cursor">|</span>';
        const typingText = heroHeading.querySelector('.typing-text');
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                typingText.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroHeading.querySelector('.cursor').style.display = 'none';
                }, 1500);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    initializeLoadingScreen();
    
    initializeNavigation();
    
    initializeSmoothScrolling();
    
    initializeAnimations();
    
    initializeTypingEffect();
    
    initializeThemeToggle();
});

// Loading Screen Functions
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const typingTextElement = document.getElementById('typing-text');
    const loadingText = "okay, let's build...";

    // The intro plays once per visit and stays under a second. The inline script in
    // <head> marks repeat visits and reduced-motion visitors so it never paints for them.
    if (document.documentElement.classList.contains('skip-intro')) {
        loadingScreen.classList.add('hidden');
        return;
    }
    try {
        sessionStorage.setItem('mofixiu-intro-seen', '1');
    } catch (error) {}

    // Type the line fast enough to finish well before the screen fades
    let charIndex = 0;
    const typeText = () => {
        if (charIndex < loadingText.length) {
            typingTextElement.textContent += loadingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 22);
        }
    };
    typeText();

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';

        // Trigger entrance animations
        triggerEntranceAnimations();
    }, 600);

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
}

// Navigation Functions
function initializeNavigation() {
    // The dock underlines the section you're reading.
    const links = [...document.querySelectorAll('.dock-link[href^="#"]')];
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const link = links.find((item) => item.hash === `#${entry.target.id}`);
            if (!link) return;
            link.classList.toggle('active', entry.isIntersecting);
            if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((link) => {
        const section = document.querySelector(link.hash);
        if (section) observer.observe(section);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Project links use href="#" as a Bootstrap modal trigger; exclude them
    // so this smooth-scroll handler does not interfere with opening the modal.
    const links = document.querySelectorAll('a[href^="#"]:not([data-bs-toggle])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    // Content stays visible even when a browser delays or disables
    // IntersectionObserver callbacks (especially common on mobile).
    // Decorative motion belongs to the hero; reading content must never depend on it.
}

function triggerEntranceAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Typing Effect
function initializeTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (!nameElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    // Start as the intro fades, or almost at once when it was skipped
    const delay = document.documentElement.classList.contains('skip-intro') ? 250 : 800;
    setTimeout(() => {
        typeWriter(nameElement, originalText, 100);
    }, delay);
}

function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


// Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 40px var(--card-hover-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Contact Form Interactions (if you add a contact form later)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            const formData = new FormData(contactForm);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#1e3a8a';
            notification.style.color = '#fff';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--accent-color)';
            break;
        default:
            notification.style.backgroundColor = '#333';
    }
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Background
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    const codeSnippet = document.querySelector('.code-snippet');
    
    if (heroSection && codeSnippet) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            
            codeSnippet.style.transform = `rotate(15deg) translateY(${parallaxSpeed}px)`;
        });
    }
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initializeParallax);

// Theme Management
function initializeTheme() {
    // A theme picked on any mofiyinebo.com site (a shared cookie) wins; then this site's own choice.
    const shared = document.cookie.match(/(?:^|; )mofixiu-theme=(light|dark)/);
    const savedTheme = shared ? shared[1] : localStorage.getItem('portfolio-theme');
    // Use the cream light theme by default; retain a visitor's explicit choice.
    if (savedTheme !== 'dark') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Theme Toggle
// Same as the paper kit: the new theme spreads from the toggle like an ink blot.
function inkBlot(cx, cy, radius, phase, points = 72) {
    const vertices = [];
    for (let i = 0; i < points; i += 1) {
        const angle = (i / points) * Math.PI * 2;
        const wobble = 1 + 0.07 * Math.sin(3 * angle + phase) + 0.045 * Math.sin(7 * angle + phase * 1.7) + 0.025 * Math.sin(13 * angle - phase * 2.3);
        const r = Math.max(0, radius * wobble);
        vertices.push(`${(cx + r * Math.cos(angle)).toFixed(1)}px ${(cy + r * Math.sin(angle)).toFixed(1)}px`);
    }
    return `polygon(${vertices.join(', ')})`;
}

function inkBlotFrames(cx, cy, width, height, steps = 10) {
    const reach = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy)) * 1.2;
    return Array.from({ length: steps + 1 }, (_, i) => ({ clipPath: inkBlot(cx, cy, (reach * i) / steps, (i / steps) * 2.4) }));
}

function setTheme(isLight) {
    document.body.classList.toggle('light-theme', isLight);
    updateThemeToggle();
}

function initializeThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!themeToggle) return;

    updateThemeToggle();

    themeToggle.addEventListener('click', () => {
        const isLight = !document.body.classList.contains('light-theme');
        const apply = () => {
            setTheme(isLight);
            try {
                localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            } catch (error) {}
            // Shared with the CV, the paper kit and the other subdomains.
            const domain = /(^|\.)mofiyinebo\.com$/.test(location.hostname) ? '; domain=mofiyinebo.com' : '';
            const secure = location.protocol === 'https:' ? '; secure' : '';
            document.cookie = `mofixiu-theme=${isLight ? 'light' : 'dark'}; path=/; max-age=31536000; samesite=lax${domain}${secure}`;
        };
        if (!document.startViewTransition || reducedMotion.matches) {
            apply();
            return;
        }
        const dot = themeToggle.querySelector('.theme-toggle-dot').getBoundingClientRect();
        const root = document.documentElement;
        root.classList.add('theme-swapping');
        const transition = document.startViewTransition(apply);
        transition.ready.then(() => {
            root.animate(inkBlotFrames(dot.left + dot.width / 2, dot.top + dot.height / 2, innerWidth, innerHeight), {
                duration: 760,
                easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                pseudoElement: '::view-transition-new(root)'
            });
        }).catch(() => {});
        transition.finished.finally(() => root.classList.remove('theme-swapping'));
    });

    // Follow the system theme until the visitor picks one.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) setTheme(!e.matches);
    });
}

// The toggle names the theme it switches to; the browser bar matches the paper.
function updateThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const label = themeToggle?.querySelector('.theme-toggle-label');
    const isLight = document.body.classList.contains('light-theme');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isLight ? '#f4ecde' : '#171512';
    
    if (label) {
        label.textContent = isLight ? 'dark' : 'light';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
}

// Mobile Navigation Toggle

// Preloader for images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            // Scroll-dependent functions here
        }, 16); // 60fps
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    preloadImages();
});

// Accessibility improvements
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
}

document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Keep keyboard focus in a predictable place when project dialogs open and close.
function initializeModalFocus() {
    const modalTriggers = new WeakMap();

    document.addEventListener('show.bs.modal', function(event) {
        if (event.relatedTarget instanceof HTMLElement) {
            modalTriggers.set(event.target, event.relatedTarget);
        }
    });

    document.addEventListener('shown.bs.modal', function(event) {
        event.target.querySelector('.btn-close')?.focus();
    });

    document.addEventListener('hidden.bs.modal', function(event) {
        const trigger = modalTriggers.get(event.target);
        if (trigger && document.contains(trigger)) {
            trigger.focus();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeModalFocus);

// A single ladybug rests above the hero title. Tap it and it opens its wings and flies
// off the screen, staying away for the rest of the visit.
function initializeLadybug() {
    const ladybug = document.querySelector('.ladybug');
    if (!ladybug) return;

    try {
        if (sessionStorage.getItem('ladybug-flown')) {
            ladybug.remove();
            return;
        }
    } catch (error) {}

    ladybug.addEventListener('click', () => {
        if (ladybug.classList.contains('is-flying')) return;
        ladybug.classList.add('is-flying');
        try {
            sessionStorage.setItem('ladybug-flown', '1');
        } catch (error) {}

        const flight = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? ladybug.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
            : ladybug.animate([
                { transform: 'translate(0, 0) rotate(0deg)' },
                { transform: 'translate(-14px, -28px) rotate(-22deg)', offset: 0.18 },
                { transform: 'translate(34px, -96px) rotate(24deg)', offset: 0.42 },
                { transform: 'translate(18vw, -48vh) rotate(36deg) scale(0.85)', offset: 0.72 },
                { transform: 'translate(55vw, -120vh) rotate(40deg) scale(0.6)' }
            ], { delay: 260, duration: 1700, easing: 'cubic-bezier(0.45, 0, 0.6, 1)', fill: 'forwards' });
        flight.finished.then(() => ladybug.remove());
    });
}

document.addEventListener('DOMContentLoaded', initializeLadybug);

// Cut-out letters are laid down one by one, like the paper kit's.
function initializeCutouts() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.hv-cut .cutout').forEach((letter, index) => {
        letter.animate(
            [{ transform: `translateY(-0.18em) rotate(${index % 2 ? 4 : -3}deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
            { duration: 520, delay: 300 + index * 45, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', fill: 'backwards' }
        );
    });
}

document.addEventListener('DOMContentLoaded', initializeCutouts);

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You could add a placeholder image here
            // this.src = 'path/to/placeholder.jpg';
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', handleImageErrors);


// Mobile-friendly modal close functionality
function initializeMobileModalClose() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Add tap-to-close functionality for mobile
        modal.addEventListener('click', function(e) {
            // Only close if clicking on the modal backdrop (not the modal content)
            if (e.target === this) {
                const bsModal = bootstrap.Modal.getInstance(this);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        });
        
    });
}

// Add escape key functionality
function initializeEscapeKey() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const bsModal = bootstrap.Modal.getInstance(openModal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        }
    });
}

// Add mobile touch indicator for modals
function addMobileModalIndicator() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent && window.innerWidth <= 768) {
            // Add swipe indicator at the top of modal
            const existingIndicator = modalContent.querySelector('.mobile-modal-indicator');
            if (!existingIndicator) {
                const indicator = document.createElement('div');
                indicator.className = 'mobile-modal-indicator';
                indicator.innerHTML = '<div class="swipe-bar"></div>';
                
                modalContent.insertBefore(indicator, modalContent.firstChild);
            }
        }
    });
}

// Initialize all mobile modal features
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileModalClose();
    initializeEscapeKey();
    
    // Check if on mobile and add indicators
    if (window.innerWidth <= 768) {
        addMobileModalIndicator();
    }
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            addMobileModalIndicator();
        }
    });
});

// A project card opens its case study wherever you click it, not only on "Read case study".
// Its own links and buttons still do their own thing, and selecting text never opens anything.
function initializeCardCaseStudies() {
    document.querySelectorAll('.featured-project-card, .compact-project').forEach(function(card) {
        const opener = card.querySelector('.project-link[data-bs-toggle="modal"]') || card.querySelector('[data-bs-toggle="modal"]');
        if (!opener) return;
        card.classList.add('is-openable');
        card.addEventListener('click', function(event) {
            if (event.target.closest('a, button, input, select, textarea, summary, label')) return;
            if (String(window.getSelection()).trim()) return;
            opener.click();
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeCardCaseStudies);

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
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    const updateNavbarState = () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 20);
    };
    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState);

    // Scroll snapping settles sections just below the navbar. It is measured with the
    // phone menu closed, so opening the menu never shifts where the page settles.
    const menu = document.getElementById('navbarNav');
    const updateNavbarHeight = () => {
        if (!menu.classList.contains('show')) {
            document.documentElement.style.setProperty('--nav-h', `${navbar.offsetHeight}px`);
        }
    };
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
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
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
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

// Skill Badge Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

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
    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    // Use the cream light theme by default; retain a visitor's explicit choice.
    if (savedTheme !== 'dark') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Theme Toggle (Enhanced version)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    
    if (themeToggle) {
        // Set initial icon
        updateThemeIcon();
        
        themeToggle.addEventListener('click', function() {
            // Toggle theme
            document.body.classList.toggle('light-theme');
            
            // Update icon
            updateThemeIcon();
            
            // Save theme preference
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            // Add rotation animation
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
            
            // Show theme change notification
            showNotification(
                `Switched to ${isLight ? 'light' : 'dark'} mode`, 
                'success'
            );
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                if (e.matches) {
                    document.body.classList.remove('light-theme');
                } else {
                    document.body.classList.add('light-theme');
                }
                updateThemeIcon();
            }
        });
    }
}

function updateThemeIcon() {
    const themeToggle = document.querySelector('#theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    if (icon) {
        const isLight = document.body.classList.contains('light-theme');
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        
        // Update aria-label for accessibility
        themeToggle.setAttribute('aria-label', 
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
        );
    }
}

// Mobile Navigation Toggle
function initializeMobileNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Bootstrap manages aria-expanded on its collapse trigger. Keep the
        // accessible name in sync so screen-reader users know the next action.
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            navbarToggler.setAttribute('aria-label', 'Close navigation menu');
        });

        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            navbarToggler.setAttribute('aria-label', 'Open navigation menu');
        });

        // Close mobile nav when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
}

// Initialize mobile nav
document.addEventListener('DOMContentLoaded', initializeMobileNav);

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
    
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.skill-badge');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                element.click();
            }
        });
    });
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

// Loading Screen and Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize theme toggle
    initializeThemeToggle();
});

// Loading Screen Functions
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const typingTextElement = document.getElementById('typing-text');
    const loadingText = "initializing portfolio...";
    
    // Start typing animation
    let charIndex = 0;
    const typeText = () => {
        if (charIndex < loadingText.length) {
            typingTextElement.textContent += loadingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 80); // Typing speed
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 800); // Wait a bit longer to see the completed text
        }
        
        progressFill.style.width = progress + '%';
    }, 200);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
    
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
    const links = document.querySelectorAll('a[href^="#"]');
    
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
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content, .skill-category, .education-item, .experience-item, .project-card, .contact-content'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-category.animate-in {
            transition-delay: 0.1s;
        }
        
        .skill-category:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .skill-category:nth-child(3).animate-in {
            transition-delay: 0.3s;
        }
        
        .project-card.animate-in {
            transition-delay: 0.1s;
        }
        
        .project-card:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3).animate-in {
            transition-delay: 0.3s;
        }
        
        .project-card:nth-child(4).animate-in {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
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
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    setTimeout(() => {
        typeWriter(nameElement, originalText, 100);
    }, 1000);
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
            this.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.15)';
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
            notification.style.backgroundColor = '#ff6b35';
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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or default to user's system preference
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
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
    const interactiveElements = document.querySelectorAll('.skill-badge, .project-card');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                element.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

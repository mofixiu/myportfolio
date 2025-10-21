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
    const progressFill = document.querySelector('.progress-fill');
    const typingTextElement = document.getElementById('typing-text');
    const loadingText = "loading portfolio.....";
    
    // Start typing animation
    let charIndex = 0;
    const typeText = () => {
        if (charIndex < loadingText.length) {
            typingTextElement.textContent += loadingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 80); 
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

document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Screenshot Gallery Functionality
function changeScreenshot(mainImageId, newSrc) {
    const mainImg = document.getElementById(mainImageId);
    if (mainImg) {
        mainImg.src = newSrc;
    }
    
    // Update active thumbnail
    const modalBody = mainImg.closest('.modal-body');
    if (modalBody) {
        const thumbnails = modalBody.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.src === newSrc) {
                thumb.classList.add('active');
            }
        });
    }
}

// Initialize screenshot galleries for all modals
function initializeScreenshotGalleries() {
    // Add click event listeners to all thumbnails
    const thumbnails = document.querySelectorAll('.screenshot-thumbnails .thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.style.cursor = 'pointer';
        
        thumbnail.addEventListener('click', function() {
            const modalBody = this.closest('.modal-body');
            const mainImg = modalBody.querySelector('.main-screenshot img');
            
            if (mainImg) {
                // Update main image
                mainImg.src = this.src;
                
                // Update active state
                const allThumbnails = modalBody.querySelectorAll('.thumbnail');
                allThumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            }
        });
        
        // Add keyboard accessibility
        thumbnail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add tabindex for keyboard navigation
        thumbnail.setAttribute('tabindex', '0');
    });
}

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
document.addEventListener('DOMContentLoaded', function() {
    initializeScreenshotGalleries();
    handleImageErrors();
});

// Re-initialize when modals are shown (for dynamic content)
document.addEventListener('shown.bs.modal', function() {
    initializeScreenshotGalleries();
});

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
        
        // Add swipe-down gesture to close modal on mobile
        let startY = 0;
        let currentY = 0;
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            // Touch start
            modalContent.addEventListener('touchstart', function(e) {
                startY = e.touches[0].clientY;
            }, { passive: true });
            
            // Touch move
            modalContent.addEventListener('touchmove', function(e) {
                currentY = e.touches[0].clientY;
                const deltaY = currentY - startY;
                
                // If swiping down and at the top of the content, add visual feedback
                if (deltaY > 0 && modalContent.scrollTop === 0) {
                    const opacity = Math.max(0.7, 1 - (deltaY / 200));
                    modalContent.style.transform = `translateY(${Math.min(deltaY / 4, 50)}px)`;
                    modalContent.style.opacity = opacity;
                }
            }, { passive: true });
            
            // Touch end
            modalContent.addEventListener('touchend', function(e) {
                const deltaY = currentY - startY;
                
                // If swiped down far enough, close the modal
                if (deltaY > 100 && modalContent.scrollTop === 0) {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) {
                        bsModal.hide();
                    }
                }
                
                // Reset transform and opacity
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
                modalContent.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                
                // Remove transition after animation
                setTimeout(() => {
                    modalContent.style.transition = '';
                }, 300);
            }, { passive: true });
        }
        
        // Enhance existing close button for mobile
        const modalHeader = modal.querySelector('.modal-header');
        if (modalHeader && window.innerWidth <= 768) {
            const existingCloseBtn = modalHeader.querySelector('.btn-close');
            if (existingCloseBtn) {
                existingCloseBtn.innerHTML = '✕'; // Use X symbol
                existingCloseBtn.style.fontSize = '1.2rem';
                existingCloseBtn.style.fontWeight = 'bold';
            }
        }
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

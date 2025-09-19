// ==========================================
// MODERN JAVASCRIPT FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initSmoothScrolling();
    initMobileMenu();
    initFormHandling();
});

// ==========================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);

    
    themeToggle.addEventListener('click', function() {
       const currentTheme = document.documentElement.getAttribute('data-color-scheme');
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
document.documentElement.setAttribute('data-color-scheme', newTheme);

        
        // Add animation class
        themeToggle.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 300);
    });
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;
    
    // Hide/Show navbar on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .timeline-item,
        .contact-item,
        .about-stats,
        .profile-card
    `);
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// ==========================================
// TYPING ANIMATION
// ==========================================
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Azure Cloud Data Engineer',
        'Website Developer',
        'Professional Video Editor',
        'Creative Professional'
       
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeEffect() {
        if (isWaiting) {
            setTimeout(typeEffect, 1500);
            isWaiting = false;
            return;
        }
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 15 : 55;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }
        
        setTimeout(typeEffect, speed);
    }
    
    // Start the typing animation
    setTimeout(typeEffect, 1000);
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// FORM HANDLING
// ==========================================
function initFormHandling() {
    const form = document.querySelector('.form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => removeNotification(notification));
    
    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ==========================================
// FLOATING CARDS ANIMATION
// ==========================================
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Add random animation delay
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add mousemove effect for subtle interactivity
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for high-frequency events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Get CSS custom property value
function getCSSVariable(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
}

// Set CSS custom property value
function setCSSVariable(property, value) {
    document.documentElement.style.setProperty(property, value);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    }
});

// Focus management for accessibility
function initFocusManagement() {
    const focusableElements = document.querySelectorAll(`
        a[href],
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled]),
        [tabindex]:not([tabindex="-1"])
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
initFocusManagement();

// ==========================================
// INTERSECTION OBSERVER FOR PERFORMANCE
// ==========================================

// Lazy load images when they come into view
function initLazyLoading() {
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

// ==========================================
// BROWSER SUPPORT CHECKS
// ==========================================

// Check for CSS custom properties support
function checkCSSCustomPropertiesSupport() {
    if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
        console.warn('CSS custom properties are not supported in this browser');
        // Fallback for older browsers
        document.body.classList.add('no-css-custom-properties');
    }
}

// Check for Intersection Observer support
function checkIntersectionObserverSupport() {
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver is not supported in this browser');
        // Fallback: show all elements immediately
        const elementsToReveal = document.querySelectorAll('.scroll-reveal');
        elementsToReveal.forEach(element => {
            element.classList.add('revealed');
        });
    }
}

// Run browser support checks
checkCSSCustomPropertiesSupport();
checkIntersectionObserverSupport();

// ==========================================
// INITIALIZE ON LOAD
// ==========================================

// Additional initialization after DOM is fully loaded
window.addEventListener('load', function() {
    initFloatingCards();
    initLazyLoading();
    
    // Remove loading class if present
    document.body.classList.remove('loading');
    
    // Add loaded class for additional styling
    document.body.classList.add('loaded');
});

// ==========================================
// RESIZE HANDLER
// ==========================================

window.addEventListener('resize', debounce(function() {
    // Update any layout calculations on resize
    // This is where you'd recalculate dynamic layouts if needed
}, 250));

// ==========================================
// ERROR HANDLING
// ==========================================

// Global error handler for graceful degradation
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Could send error to analytics service here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error to analytics service here
});

// CLICKABLE PROJECT CARDS FUNCTIONALITY
function initClickableProjectCards() {
    const projectCards = document.querySelectorAll('.clickable-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the project link directly
            if (e.target.closest('.project-link')) {
                return;
            }
            
            const url = this.getAttribute('data-url');
            if (url && url !== '#') {
                // Add click animation
                this.style.transform = 'translateY(-5px) scale(0.98)';
                
                // Reset animation and open link
                setTimeout(() => {
                    this.style.transform = '';
                    window.open(url, '_blank', 'noopener,noreferrer');
                }, 150);
            }
        });
        
        // Add keyboard support for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View ${card.querySelector('.project-title').textContent} on GitHub`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = this.getAttribute('data-url');
                if (url && url !== '#') {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing initialization code ...
    initClickableProjectCards(); // Add this line
});


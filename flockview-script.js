// Main app initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Main application initialization
 */
const initializeApp = () => {
    setupNavigation();
    setupAnimations();
    initializeVideoPlayer();
    setupContactForm();
    setupPricingToggle();
    initializeTestimonialCarousel();
    setupSmoothScrolling();
    setupMobileMenu();
};

/**
 * Navigation handling
 */
const setupNavigation = () => {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav-hamburger');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav--open');
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    });
};

/**
 * Mobile menu functionality
 */
const setupMobileMenu = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('.nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
        });
    });
};

/**
 * Smooth scrolling for navigation links
 */
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/**
 * Intersection Observer for scroll animations
 */
const setupAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
    
    // Add staggered animation delay
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
};

/**
 * YouTube video player initialization
 */
const initializeVideoPlayer = () => {
    const videoPlayer = document.querySelector('#video-player');
    if (!videoPlayer) return;
    
    videoPlayer.addEventListener('click', () => {
        // Replace placeholder with actual YouTube embed
        const videoId = 'YOUR_VIDEO_ID'; // Replace with actual video ID
        videoPlayer.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    });
};

/**
 * Contact form handling with validation
 */
const setupContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateFormData(data)) {
            showToast('Please fill in all required fields correctly', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(data);
            
            showToast('Thank you for contacting us! We\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('An error occurred. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
};

/**
 * Form data validation
 */
const validateFormData = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
        data.name?.trim().length > 0 &&
        emailRegex.test(data.email) &&
        data['farm-size']?.trim().length > 0
    );
};

/**
 * Simulate form submission (replace with actual API call)
 */
const simulateFormSubmission = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve({ success: true });
        }, 2000);
    });
};

/**
 * Testimonial carousel functionality
 */
const initializeTestimonialCarousel = () => {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    // Set initial positions
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.style.transition = 'transform 0.5s ease-in-out';
    });
    
    const updateCarousel = () => {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
    };
    
    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
            updateCarousel();
        }
    });
};

/**
 * Pricing toggle functionality
 */
const setupPricingToggle = () => {
    const toggle = document.querySelector('#billing-toggle');
    const prices = document.querySelectorAll('.price-amount');
    
    if (!toggle) return;
    
    const monthlyPrices = ['$29', '$79', '$199'];
    const annualPrices = ['$23', '$63', '$159'];
    
    toggle.addEventListener('change', () => {
        prices.forEach((price, index) => {
            if (toggle.checked) {
                // Annual pricing
                price.textContent = annualPrices[index];
                price.parentElement.querySelector('.price-period').textContent = '/month';
            } else {
                // Monthly pricing
                price.textContent = monthlyPrices[index];
                price.parentElement.querySelector('.price-period').textContent = '/month';
            }
        });
    });
};

/**
 * Show toast notification
 */
const showToast = (message, type = 'success') => {
    const toast = createToast(type, message);
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

/**
 * Create toast notification element
 */
const createToast = (type, message) => {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    return toast;
};

/**
 * Counter animation for stats
 */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

/**
 * Parallax effect for hero section
 */
const setupParallax = () => {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(${rate * speed}px)`;
        });
    });
};

/**
 * Add loading animation to buttons
 */
const setupButtonAnimations = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

/**
 * Initialize all animations and effects
 */
const initializeEffects = () => {
    // Trigger counter animation when stats come into view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }
    
    // Setup parallax effect
    setupParallax();
    
    // Setup button animations
    setupButtonAnimations();
};

// Initialize effects after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEffects();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav--scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav--open .nav-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav--open .nav-menu {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.FlockViewApp = {
    initializeApp,
    setupNavigation,
    setupAnimations,
    initializeVideoPlayer,
    setupContactForm,
    setupPricingToggle,
    initializeTestimonialCarousel,
    showToast,
    animateCounters
}; 
// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        });
    });
}

// Navbar Scroll Effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all loading elements
const loadingElements = document.querySelectorAll('.loading');
loadingElements.forEach(el => observer.observe(el));

// Observe feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ 메시지가 전송되었습니다!';
        submitButton.style.backgroundColor = '#34c759';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });

    // Form validation with visual feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ff3b30';
            } else {
                input.style.borderColor = '#34c759';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--accent-color)';
        });
    });
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero.querySelector('.hero-content')) {
            hero.querySelector('.hero-content').style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Add hover effect to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-button, .submit-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature Cards Hover Effect
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy Loading for Images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to current page in navigation
const currentPage = window.location.pathname;
navLinks.querySelectorAll('a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPage === linkPath || currentPage.startsWith(linkPath) && linkPath !== '/') {
        link.style.color = 'var(--accent-color)';
        link.style.fontWeight = '600';
    }
});

// Prevent animations on page load (wait for DOM to be ready)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll handling if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Console message for developers
console.log('%c👋 안녕하세요!', 'color: #0071e3; font-size: 20px; font-weight: bold;');
console.log('%c이 사이트는 Apple 스타일의 디자인으로 제작되었습니다.', 'color: #6e6e73; font-size: 14px;');

// Add smooth transitions to all interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});
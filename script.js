// ===== SMOOTH SCROLLING FOR NAV LINKS =====
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

// ===== BUTTON INTERACTIONS =====
const ctaButton = document.querySelector('.cta-button');
const shopButtons = document.querySelectorAll('.shop-button');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showNotification('Redirecting to Shop Collection...');
        // Scroll to products section
        setTimeout(() => {
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });

    ctaButton.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
    });

    ctaButton.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
}

shopButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Opening Shop Collection...');
        setTimeout(() => {
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });

    button.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.08)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ===== PRODUCT CARD INTERACTIONS =====
const productCards = document.querySelectorAll('.card, .card1, .card2');

productCards.forEach(card => {
    card.addEventListener('click', function () {
        const productName = this.getAttribute('data-product') || this.querySelector('h3').textContent;
        showNotification(`Added to Cart: ${productName}`);
        this.style.backgroundColor = '#a8d8ea';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 300);
    });

    card.addEventListener('mouseenter', function () {
        this.style.cursor = 'pointer';
    });
});

// ===== IMAGE LAZY LOADING & ERROR HANDLING =====
const images = document.querySelectorAll('img[loading="lazy"]');
images.forEach(img => {
    img.addEventListener('error', () => {
        console.warn(`Failed to load image: ${img.src}`);
        img.style.display = 'none';
        img.parentElement.style.backgroundColor = '#f0f0f0';
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and sections
document.querySelectorAll('.card, .card1, .card2, .section').forEach(el => {
    el.style.opacity = '0.8';
    observer.observe(el);
});


// ===== KEYBOARD ACCESSIBILITY =====
document.querySelectorAll('.card, .card1, .card2').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-in-out';
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');

        menuToggle.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );
    });

    // Close menu after selecting a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

console.log('✅ PetCare Script Loaded Successfully');

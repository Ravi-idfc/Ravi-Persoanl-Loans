// IDFC Bank Personal Loan Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Form handling
    setupFormHandling();
    
    // Smooth scrolling for navigation
    setupSmoothScrolling();
});

// Smooth Scrolling Functions
function scrollToForm() {
    document.getElementById('apply-form').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToContact() {
    document.getElementById('apply-form').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Initialize animations on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .benefit-card, .stat-card');
    animateElements.forEach(el => observer.observe(el));
}

// Setup smooth scrolling for all internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function setupFormHandling() {
    const form = document.getElementById('loanForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // For demo purposes, we'll show success after 2 seconds
    // In production, replace this with actual Formspree submission
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
    
    // Uncomment below for actual Formspree submission
    /*
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showSuccessMessage();
            form.reset();
        } else {
            showErrorMessage();
        }
    }).catch(error => {
        showErrorMessage();
    }).finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    */
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Application Submitted Successfully!</strong><br>
        Thank you for your interest. Raveendhiran.N will contact you within 24 hours.
    `;
    
    const form = document.getElementById('loanForm');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show error message
function showErrorMessage() {
    alert('There was an error submitting your application. Please try again or call directly at 8883620962.');
}

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    if (value.length <= 10) {
        input.value = value;
    }
}

// Add phone number formatting to mobile input
document.addEventListener('DOMContentLoaded', function() {
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Add form validation
function validateForm() {
    const form = document.getElementById('loanForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Validate mobile number
    const mobile = document.getElementById('mobile');
    if (mobile.value && mobile.value.length !== 10) {
        mobile.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loanForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
});

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call to action tracking (for analytics if needed)
function trackCTA(action) {
    // Add analytics tracking here if needed
    console.log('CTA tracked:', action);
}

// Add click tracking to important buttons
document.addEventListener('DOMContentLoaded', function() {
    // Track Apply Now buttons
    document.querySelectorAll('button[onclick="scrollToForm()"]').forEach(btn => {
        btn.addEventListener('click', () => trackCTA('hero-apply-now'));
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => trackCTA('phone-call'));
    });
});

// Performance optimization - defer non-critical operations
window.addEventListener('load', function() {
    // Initialize lazy loading
    lazyLoadImages();
    
    // Initialize any other non-critical features
    console.log('IDFC Personal Loan Website fully loaded');
});
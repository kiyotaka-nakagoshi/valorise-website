// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Language Toggle
let currentLang = 'ja';

const translations = {
    ja: {
        // Hero Section
        heroTitle1: 'あなたのフィジカルを',
        heroTitle2: '"科学"する。',
        heroSubtitle: 'VALORISE フィジカル測定',
        heroDescription: 'トップアスリートも信頼する測定を、あなたに。',
        heroCTA1: '無料相談を予約',
        heroCTA2: '詳しく見る',
        heroCredentials: '理学療法士 × トレーナー × データサイエンス',
        heroFounder: '中越清登が提供する唯一無二のフィジカル測定サービス',
        
        // Navigation
        navAbout: 'VALORISEとは',
        navFeatures: '特徴',
        navServices: '測定項目',
        navBenefits: '導入メリット',
        navPricing: '料金プラン',
        navContact: 'お問い合わせ'
    },
    en: {
        // Hero Section
        heroTitle1: 'Transform Your Physical',
        heroTitle2: 'Performance with Science.',
        heroSubtitle: 'VALORISE Physical Assessment',
        heroDescription: 'Trusted by top athletes worldwide.',
        heroCTA1: 'Book Free Consultation',
        heroCTA2: 'Learn More',
        heroCredentials: 'Physical Therapist × Trainer × Data Science',
        heroFounder: 'Unique physical assessment service by Kiyoto Nakagoshi',
        
        // Navigation
        navAbout: 'About',
        navFeatures: 'Features',
        navServices: 'Services',
        navBenefits: 'Benefits',
        navPricing: 'Pricing',
        navContact: 'Contact'
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    document.getElementById('currentLang').textContent = lang === 'ja' ? 'EN' : 'JA';
    
    // Update all elements with data-ja and data-en attributes
    document.querySelectorAll('[data-ja][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update form placeholders
    document.querySelectorAll('[data-ja-placeholder][data-en-placeholder]').forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update select options
    const typeSelect = document.getElementById('type');
    if (typeSelect) {
        Array.from(typeSelect.options).forEach(option => {
            const text = option.getAttribute(`data-${lang}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
}

// Language Toggle Button
document.getElementById('langToggle').addEventListener('click', () => {
    const newLang = currentLang === 'ja' ? 'en' : 'ja';
    switchLanguage(newLang);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const logo = document.querySelector('#logo span');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        logo.classList.remove('text-gradient-white');
        logo.classList.add('text-gradient');
        navLinks.forEach(link => {
            link.classList.remove('text-white', 'hover:text-gray-200');
            link.classList.add('text-gray-800', 'hover:text-purple-600');
        });
        document.getElementById('mobileMenuBtn').classList.remove('text-white');
        document.getElementById('mobileMenuBtn').classList.add('text-gray-800');
    } else {
        navbar.classList.remove('scrolled');
        logo.classList.add('text-gradient-white');
        logo.classList.remove('text-gradient');
        navLinks.forEach(link => {
            link.classList.add('text-white', 'hover:text-gray-200');
            link.classList.remove('text-gray-800', 'hover:text-purple-600');
        });
        document.getElementById('mobileMenuBtn').classList.add('text-white');
        document.getElementById('mobileMenuBtn').classList.remove('text-gray-800');
    }
});

// Mobile Menu Toggle
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        organization: document.getElementById('organization').value,
        phone: document.getElementById('phone').value,
        type: document.getElementById('type').value,
        message: document.getElementById('message').value,
        language: currentLang
    };
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + 
        (currentLang === 'ja' ? '送信中...' : 'Sending...');
    
    try {
        const response = await axios.post('/api/contact', formData);
        
        if (response.data.success) {
            formMessage.className = 'text-center p-4 rounded-lg bg-green-100 text-green-800';
            formMessage.textContent = response.data.message;
            formMessage.classList.remove('hidden');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } else {
            throw new Error(response.data.error);
        }
    } catch (error) {
        console.error('Contact form error:', error);
        formMessage.className = 'text-center p-4 rounded-lg bg-red-100 text-red-800';
        formMessage.textContent = currentLang === 'ja' 
            ? 'エラーが発生しました。もう一度お試しください。' 
            : 'An error occurred. Please try again.';
        formMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>' + 
            (currentLang === 'ja' ? '送信する' : 'Send Message');
    }
});

// Add gradient white class for initial state
const style = document.createElement('style');
style.textContent = `
    .text-gradient-white {
        color: white;
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card-hover, .bg-white').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for statistics (if needed in future)
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-gradient');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('VALORISE Website Initialized');
console.log('Current Language:', currentLang);

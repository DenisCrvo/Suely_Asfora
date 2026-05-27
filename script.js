/* ========================================
   SCRIPT PRINCIPAL - INTERATIVIDADE
   ======================================== */

// Elementos do DOM
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.btn-whatsapp-nav)');

/* ========================================
   FUNCIONALIDADES DE NAVEGAÇÃO
   ======================================== */

// Fechar menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Scroll smooth customizado para melhor performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   ANIMAÇÕES AO SCROLL (Fade-in)
   ======================================== */

// Intersection Observer para animar elementos ao entrar na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e seções
document.querySelectorAll('.specialty-card, .principle-card, .contact-card, .atendimento-card').forEach(el => {
    observer.observe(el);
});

/* ========================================
   EFEITO NAVBAR STICKY COM BACKGROUND
   ======================================== */

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 2px 12px rgba(91, 158, 92, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 12px rgba(91, 158, 92, 0.08)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* ========================================
   EFEITO PARALLAX SUAVE (Seções de fundo)
   ======================================== */

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    // Efeito subtle na hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

/* ========================================
   RASTREAMENTO DE EVENTOS (Analytics)
   ======================================== */

// Rastrear cliques em CTAs
const trackEvent = (eventName, category, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${eventName} - ${category} - ${label}`);
};

// Rastrear cliques em botões WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    el.addEventListener('click', () => {
        trackEvent('whatsapp_click', 'engagement', el.textContent.trim());
    });
});

/* ========================================
   PERFORMANCE - LAZY LOADING DE IMAGENS
   ======================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ========================================
   INICIALIZAÇÃO E READY
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Site Suely Asfora Psicologia carregado com sucesso!');
    console.log('📊 Website: Suely Asfora - Psicóloga e Psicanalista');
    console.log('🟢 Status: Online');
    console.log('📍 Localização: Recife - PE');
});

/* ========================================
   SEO (Otimização para Motores de Busca) - DADOS ESTRUTURADOS
   ======================================== */

// Injeção de JSON-LD estruturado para informar ao Google os detalhes do negócio local (Estratégia de SEO Avançada)
const seoData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Suely Asfora - Psicóloga e Psicanalista",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Psi2.svg/512px-Psi2.svg.png",
    "url": window.location.href,
    "telephone": "+5581988724462",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Fernando Simões Barbosa, 266, sala 1409, Empresarial Wecon Center VI",
        "addressLocality": "Boa Viagem, Recife",
        "addressRegion": "PE",
        "addressCountry": "BR"
    },
    "description": "Psicóloga e Psicanalista em Recife. Atendimento a adultos e idosos online, presencial e domiciliar. CRP 02/1038.",
    "priceRange": "$$",
    "medicalSpecialty": "Psychiatric"
};

const scriptSEO = document.createElement('script');
scriptSEO.type = 'application/ld+json';
scriptSEO.text = JSON.stringify(seoData);
document.head.appendChild(scriptSEO);
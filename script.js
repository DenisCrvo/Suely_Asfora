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
   CONTADOR DE NÚMEROS (Se necessário em futuro)
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/* ========================================
   VALIDAÇÃO DE FORMULÁRIO (Se necessário)
   ======================================== */

// Função auxiliar para validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar telefone
function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s?9?\d{4}-\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/* ========================================
   RASTREAMENTO DE EVENTOS (Analytics)
   ======================================== */

// Rastrear cliques em CTAs
const trackEvent = (eventName, category, label) => {
    // Se Google Analytics estiver implementado
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

// Rastrear cliques em links de contato
document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener('click', () => {
        trackEvent('email_click', 'engagement', 'email');
    });
});

/* ========================================
   CARREGAR MAIS ESPECIALIDADES (Se necessário)
   ======================================== */

let specialtiesLoaded = 6;
const allSpecialties = 7;

function loadMoreSpecialties() {
    if (specialtiesLoaded < allSpecialties) {
        console.log('Carregando mais especialidades...');
        specialtiesLoaded++;
    } else {
        console.log('Todas as especialidades foram carregadas');
    }
}

/* ========================================
   NOTIFICAÇÃO DE CONTATO (Feedback Visual)
   ======================================== */

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/* ========================================
   VALIDAÇÃO DE CAMPOS DO FORMULÁRIO
   ======================================== */

// Validar campo de email em tempo real
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !isValidEmail(input.value)) {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
});

/* ========================================
   ATALHOS DE TECLADO
   ======================================== */

document.addEventListener('keydown', (e) => {
    // Alt + W para abrir WhatsApp
    if (e.altKey && e.key === 'w') {
        e.preventDefault();
        window.open('https://wa.me/5581999999999', '_blank');
    }
    
    // Alt + E para ir para contato
    if (e.altKey && e.key === 'e') {
        e.preventDefault();
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    }
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
   MODO ESCURO (Opcional - Comentado)
   ======================================== */

// Descomente para ativar modo escuro
/*
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Respeitar preferência do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('darkMode')) {
        document.body.classList.add('dark-mode');
    }
}
*/

/* ========================================
   INICIALIZAÇÃO E READY
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Site Seudy Isfero Psicologia carregado com sucesso!');
    
    // Inicializar tooltips do Bootstrap (se necessário)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Log de analytics customizado
    console.log('📊 Website: Seudy Isfero - Psicóloga e Psicanalista');
    console.log('🟢 Status: Online');
    console.log('📍 Localização: Recife - PE');
});

/* ========================================
   FUNÇÕES AUXILIARES EXPORTADAS
   ======================================== */

// Função para abrir formulário de contato
window.openContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
};

// Função para abrir WhatsApp
window.openWhatsApp = () => {
    window.open('https://wa.me/5581999999999', '_blank');
};

// Função para abrir email
window.openEmail = () => {
    window.location.href = 'mailto:contato@seudypsicologia.com.br';
};

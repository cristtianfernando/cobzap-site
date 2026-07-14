const GATE_KEY = 'cobchat-gate';
const SESSION_GATE_KEY = 'cobchat-gate-session';
const API_URL = 'salvar_lead.php';
const PLANOS = [
    { nome: 'Essencial', faixa: [1, 4], preco: 97 },
    { nome: 'Padrão', faixa: [5, 10], preco: 87 },
    { nome: 'Profissional', faixa: [11, 20], preco: 77 },
    { nome: 'Avançado', faixa: [21, 50], preco: 67 },
    { nome: 'Business', faixa: [51, 100], preco: 57 },
    { nome: 'Corporativo', faixa: [101, Infinity], preco: 47 }
];
const CUSTO_WEB = 47;
const CUSTO_OFICIAL = 97;
const CUSTO_UTILIDADE = 0.12;
const CUSTO_MARKETING = 0.47;

const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    const ddd = digits.slice(0, 2);
    const prefix = digits.slice(2, 7);
    const suffix = digits.slice(7, 11);
    if (digits.length <= 2) return `(${ddd}`;
    if (digits.length <= 7) return `(${ddd}) ${prefix}`;
    return `(${ddd}) ${prefix}-${suffix}`;
};

const setError = (fieldId, message) => {
    const slot = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (slot) slot.textContent = message || '';
};

const clearErrors = (form) => {
    form.querySelectorAll('small[data-error-for]').forEach((el) => (el.textContent = ''));
};

const setFeedback = (message, type = '') => {
    const el = document.getElementById('gate-feedback');
    if (!el) return;
    el.textContent = message || '';
    el.className = `feedback${type ? ` ${type}` : ''}`;
};

const validateGate = (data) => {
    let valid = true;
    clearErrors(document.getElementById('gate-form'));

    if (!data.nome.trim()) { setError('gate-nome', 'Informe seu nome'); valid = false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) { setError('gate-email', 'E-mail inválido'); valid = false; }
    if (data.telefone.replace(/\D/g, '').length < 10) { setError('gate-telefone', 'Telefone incompleto'); valid = false; }
    if (!data.cargo) { setError('gate-cargo', 'Selecione um cargo'); valid = false; }
    if (!data.tamanho_time) { setError('gate-time', 'Selecione o tamanho'); valid = false; }

    return valid;
};

const toggleGate = (open) => {
    const overlay = document.getElementById('gate-overlay');
    if (!overlay) return;
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
};

const attachSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

const submitLead = async (data, submitBtn) => {
    setFeedback('Enviando...', '');
    submitBtn.disabled = true;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const rawText = await response.text();
        let result = {};
        try { result = rawText ? JSON.parse(rawText) : {}; } catch (e) { result = {}; }

        if (!response.ok) throw new Error(result.message || rawText || `Falha ao enviar (HTTP ${response.status}).`);
        if (result.success === false) throw new Error(result.message || rawText || 'Erro ao salvar.');

        setFeedback('Dados enviados com sucesso!', 'success');
        localStorage.setItem(GATE_KEY, JSON.stringify(data));
        toggleGate(false);
    } catch (error) {
        console.error('Envio do lead falhou:', error);
        setFeedback(error.message || 'Erro inesperado.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Acessar página';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gate-form');
    const phone = document.getElementById('gate-telefone');

    attachSmoothScroll();

    // Usuário que já enviou o form não vê o gate novamente em nenhuma sessão
    const hasSubmitted = !!localStorage.getItem(GATE_KEY);
    const hasSeenGateThisSession = sessionStorage.getItem(SESSION_GATE_KEY) === '1';

    if (!hasSubmitted && !hasSeenGateThisSession) {
        toggleGate(true);
        sessionStorage.setItem(SESSION_GATE_KEY, '1');
    } else {
        toggleGate(false);
    }

    phone?.addEventListener('input', (event) => {
        event.target.value = formatPhone(event.target.value);
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Enviando...';
        const telefoneDigits = form.telefone.value.replace(/\D/g, '').slice(0, 11);
        const data = {
            nome: form.nome.value.trim(),
            telefone: telefoneDigits,
            telefone_formatado: formatPhone(form.telefone.value),
            email: form.email.value.trim(),
            cargo: form.cargo.value,
            tamanho_time: form['tamanho-time'].value,
            data_cadastro: new Date().toISOString(),
            user_agent: navigator.userAgent,
            origem: 'gate-cobchat'
        };

        if (!validateGate(data)) {
            if (submitBtn) submitBtn.textContent = 'Acessar página';
            return;
        }

        submitLead(data, submitBtn || form.elements[form.elements.length - 1]);
    });

    // ============================================
    // HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Fechar menu ao clicar em um link
    navLinks?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger?.classList.remove('open');
            hamburger?.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (
            navLinks?.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger?.contains(e.target)
        ) {
            navLinks.classList.remove('open');
            hamburger?.classList.remove('open');
            hamburger?.setAttribute('aria-expanded', 'false');
        }
    });

    // ============================================
    // PRICING CAROUSEL
    // ============================================
    const track = document.getElementById('pricing-track');
    const prevBtn = document.querySelector('.pricing-carousel .prev');
    const nextBtn = document.querySelector('.pricing-carousel .next');

    const scrollAmount = () => {
        if (!track) return 0;
        const card = track.querySelector('.pricing-card');
        return card ? card.getBoundingClientRect().width + 16 : 0;
    };

    nextBtn?.addEventListener('click', () => {
        const amount = scrollAmount();
        if (amount && track) track.scrollBy({ left: amount, behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
        const amount = scrollAmount();
        if (amount && track) track.scrollBy({ left: -amount, behavior: 'smooth' });
    });

    // ============================================
    // SIMULADOR DE VALORES
    // ============================================
    const inputs = {
        usuarios: document.getElementById('sim-usuarios'),
        web: document.getElementById('sim-web'),
        oficial: document.getElementById('sim-oficial'),
        volume: document.getElementById('sim-volume'),
        tipo: document.getElementById('sim-tipo')
    };
    const outputs = {
        plano: document.getElementById('sim-plano'),
        licencas: document.getElementById('sim-licencas'),
        custoWeb: document.getElementById('sim-custo-web'),
        custoOficial: document.getElementById('sim-custo-oficial'),
        custoMsg: document.getElementById('sim-custo-msg'),
        total: document.getElementById('sim-total')
    };

    const formatMoney = (n) => `R$ ${n.toFixed(2).replace('.', ',')}`;

    const calcular = () => {
        const usuarios = Math.max(0, parseInt(inputs.usuarios?.value || '0', 10));
        const web = Math.max(0, parseInt(inputs.web?.value || '0', 10));
        const oficial = Math.max(0, parseInt(inputs.oficial?.value || '0', 10));
        const volume = Math.max(0, parseInt(inputs.volume?.value || '0', 10));
        const tipo = inputs.tipo?.value || 'utilidade';

        const plano = PLANOS.find((p) => usuarios >= p.faixa[0] && usuarios <= p.faixa[1]) || PLANOS[PLANOS.length - 1];
        const licencas = usuarios * plano.preco;
        const custoWeb = web * CUSTO_WEB;
        const custoOficial = oficial * CUSTO_OFICIAL;
        const custoMsg = volume * (tipo === 'marketing' ? CUSTO_MARKETING : CUSTO_UTILIDADE);
        const total = licencas + custoWeb + custoOficial + custoMsg;

        outputs.plano.textContent = `${plano.nome} (${plano.faixa[0]}${plano.faixa[1] === Infinity ? '+' : ' a ' + plano.faixa[1]} usuários)`;
        outputs.licencas.textContent = formatMoney(licencas);
        outputs.custoWeb.textContent = formatMoney(custoWeb);
        outputs.custoOficial.textContent = formatMoney(custoOficial);
        outputs.custoMsg.textContent = formatMoney(custoMsg);
        outputs.total.textContent = formatMoney(total);
    };

    Object.values(inputs).forEach((input) => {
        input?.addEventListener('input', calcular);
        input?.addEventListener('change', calcular);
    });
    calcular();

    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-question').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Fechar todos os abertos
            document.querySelectorAll('.faq-item.open').forEach((openItem) => {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Abrir o clicado se estava fechado
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Atalho Esc para fechar o gate
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            toggleGate(false);
        }
    });

    // ============================================
    // SCREENSHOT CAROUSEL
    // ============================================
    const screenshotCarousel = (() => {
        const stage = document.getElementById('carousel-stage');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const autoplayToggle = document.getElementById('autoplay-toggle');
        const autoplayIcon = document.getElementById('autoplay-icon');
        const progressFill = document.getElementById('progress-fill');

        if (!stage) return null;

        const slides = stage.querySelectorAll('.screenshot-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        let isAutoPlaying = true;
        let autoplayInterval = null;
        const autoplayDuration = 5000;

        const updateCarousel = () => {
            stage.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        };

        const goToSlide = (index) => {
            currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
            updateCarousel();
            resetProgress();
        };

        const nextSlide = () => {
            currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
            updateCarousel();
            resetProgress();
        };

        const prevSlide = () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            updateCarousel();
            resetProgress();
        };

        const resetProgress = () => {
            if (!progressFill) return;
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            void progressFill.offsetWidth;
            if (isAutoPlaying) {
                progressFill.style.transition = `width ${autoplayDuration}ms linear`;
                progressFill.style.width = '100%';
            }
        };

        const startAutoplay = () => {
            stopAutoplay();
            isAutoPlaying = true;
            if (autoplayIcon) {
                autoplayIcon.setAttribute('data-lucide', 'pause');
                lucide.createIcons();
            }
            resetProgress();
            autoplayInterval = setInterval(nextSlide, autoplayDuration);
        };

        const stopAutoplay = () => {
            isAutoPlaying = false;
            if (autoplayIcon) {
                autoplayIcon.setAttribute('data-lucide', 'play');
                lucide.createIcons();
            }
            if (progressFill) {
                progressFill.style.transition = 'none';
                progressFill.style.width = '0%';
            }
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        };

        prevBtn?.addEventListener('click', () => {
            prevSlide();
            if (isAutoPlaying) startAutoplay();
        });

        nextBtn?.addEventListener('click', () => {
            nextSlide();
            if (isAutoPlaying) startAutoplay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                if (isAutoPlaying) startAutoplay();
            });
        });

        autoplayToggle?.addEventListener('click', () => {
            if (isAutoPlaying) { stopAutoplay(); } else { startAutoplay(); }
        });

        // Touch/swipe support
        let touchStartX = 0;
        stage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) { nextSlide(); } else { prevSlide(); }
                if (isAutoPlaying) startAutoplay();
            }
        }, { passive: true });

        // Pausar ao passar mouse sobre o carrossel
        const carouselContainer = document.querySelector('.screenshot-carousel');
        let wasAutoplaying = false;

        carouselContainer?.addEventListener('mouseenter', () => {
            wasAutoplaying = isAutoPlaying;
            if (isAutoPlaying) stopAutoplay();
        });

        carouselContainer?.addEventListener('mouseleave', () => {
            if (wasAutoplaying) startAutoplay();
        });

        // Navegação por teclado quando seção visível
        document.addEventListener('keydown', (e) => {
            const showcase = document.getElementById('showcase');
            const rect = showcase?.getBoundingClientRect();
            if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') { prevSlide(); if (isAutoPlaying) startAutoplay(); }
                else if (e.key === 'ArrowRight') { nextSlide(); if (isAutoPlaying) startAutoplay(); }
            }
        });

        updateCarousel();
        startAutoplay();

        return { goToSlide, nextSlide, prevSlide, startAutoplay, stopAutoplay };
    })();
});

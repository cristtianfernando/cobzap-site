const GATE_KEY = 'cobchat-gate';
const SESSION_GATE_KEY = 'cobchat-gate-session';
// Webhook para receber os dados em JSON
const API_URL = 'https://n8n.zcob.com.br/webhook/salvar_lead';
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
        // Webhooks podem não retornar success=true; se chegou 2xx, consideramos OK.
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

    const hasSeenGateThisSession = sessionStorage.getItem(SESSION_GATE_KEY) === '1';
    if (!hasSeenGateThisSession) {
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
            telefone: telefoneDigits, // envia apenas números
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

    // pricing carousel
    const track = document.getElementById('pricing-track');
    const prevBtn = document.querySelector('.pricing-carousel .prev');
    const nextBtn = document.querySelector('.pricing-carousel .next');

    const scrollAmount = () => {
        if (!track) return 0;
        const card = track.querySelector('.pricing-card');
        return card ? card.getBoundingClientRect().width + 12 : 0;
    };

    nextBtn?.addEventListener('click', () => {
        const amount = scrollAmount();
        if (amount && track) track.scrollBy({ left: amount, behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
        const amount = scrollAmount();
        if (amount && track) track.scrollBy({ left: -amount, behavior: 'smooth' });
    });

    // simulador de valores
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

    // Atalho Esc para fechar o gate
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            toggleGate(false);
        }
    });
});

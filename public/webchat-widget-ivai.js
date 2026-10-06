// Widget de Chat CHANNEL — tema WhatsApp / Ivaí
(function() {
    const AVATAR = 'data:image/png;base64,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';
    const BADGE_SVG = '<svg class="ivai-verified" viewBox="0 0 24 24" width="16" height="16" aria-label="Conta verificada"><path fill="#25D366" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z"/><path fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M7.8 12.3l3 3 5.6-6"/></svg>';

    const widgetHTML = `
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" rel="stylesheet">
    <div id="channel-chat-widget">
        <button id="channel-chat-button" aria-label="Abrir chat">
            <img src="${AVATAR}" alt="Ivaí">
        </button>
    </div>

    <div id="channel-chat-container">
        <div id="channel-chat-header">
            <button id="channel-chat-close" title="Fechar" aria-label="Fechar"><i class="mdi mdi-arrow-left"></i></button>
            <img class="ivai-avatar" src="${AVATAR}" alt="Ivaí">
            <div class="ivai-title">
                <div class="ivai-name"><span>Ivaí</span>${BADGE_SVG}</div>
                <div class="ivai-status">online</div>
            </div>
            <span id="channel-chat-session" style="display:none;"></span>
            <button id="channel-chat-clear" title="Nova sessão" aria-label="Nova sessão"><i class="mdi mdi-reload"></i></button>
        </div>
        <div id="channel-chat-messages"></div>
        <div id="channel-chat-input-area">
            <div class="ivai-input-wrap">
                <input type="text" id="channel-chat-input" placeholder="Digite aqui...">
                <input type="file" id="channel-chat-file" style="display: none;" accept="image/*,video/*,audio/*,.pdf,.doc,.docx">
                <button id="channel-chat-attach" title="Anexar arquivo" aria-label="Anexar arquivo"><i class="mdi mdi-paperclip"></i></button>
            </div>
            <button id="channel-chat-send" title="Enviar mensagem" aria-label="Enviar mensagem"><i class="mdi mdi-send"></i></button>
        </div>
    </div>

    <style>
        #channel-chat-widget, #channel-chat-container { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        #channel-chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 9999; }
        #channel-chat-widget.hide { display: none; }

        #channel-chat-button {
            width: 60px; height: 60px; border-radius: 50%; padding: 0; overflow: hidden;
            background: #075E54; border: 2px solid #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3); cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: transform 0.3s;
        }
        #channel-chat-button:hover { transform: scale(1.1); }
        #channel-chat-button img { width: 100%; height: 100%; object-fit: cover; display: block; }

        #channel-chat-container {
            display: none; position: fixed; bottom: 90px; right: 20px;
            width: 340px; height: 520px; background: #ECE5DD;
            border-radius: 12px; overflow: hidden;
            box-shadow: 0 6px 28px rgba(0,0,0,0.25);
            flex-direction: column; z-index: 9998;
        }
        #channel-chat-container.show { display: flex; }

        #channel-chat-header {
            background: #075E54; color: #fff; padding: 8px 10px;
            display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }
        #channel-chat-header button {
            background: none; border: none; color: #fff; cursor: pointer;
            width: 32px; height: 32px; padding: 0; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
        }
        #channel-chat-header button:hover { background: rgba(255,255,255,0.12); }
        #channel-chat-header .mdi { font-size: 22px; }
        .ivai-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: #8BC63F; }
        .ivai-title { flex: 1; min-width: 0; line-height: 1.2; }
        .ivai-name { display: flex; align-items: center; gap: 4px; font-size: 16px; font-weight: 600; }
        .ivai-verified { flex-shrink: 0; }
        .ivai-status { font-size: 12px; color: #d9f2ee; }

        #channel-chat-messages {
            flex: 1; overflow-y: auto; padding: 12px 10px;
            background-color: #ECE5DD;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23c9c0b3' stroke-width='1.4' opacity='.55'><circle cx='20' cy='22' r='7'/><path d='M70 14l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z'/><rect x='88' y='60' width='14' height='11' rx='2'/><path d='M30 80q8-10 16 0t16 0'/><circle cx='92' cy='100' r='4'/><path d='M12 105l8-8m0 8l-8-8'/></g></svg>");
        }

        .ivai-chip { text-align: center; margin: 2px 0 10px; }
        .ivai-chip span { display: inline-block; background: #d4eaf4; color: #4a5b66; font-size: 12px; padding: 4px 12px; border-radius: 8px; box-shadow: 0 1px 1px rgba(0,0,0,.1); }
        .ivai-notice { background: #fdf4c5; color: #54656f; font-size: 12.5px; line-height: 1.4; text-align: center; padding: 8px 12px; border-radius: 8px; margin: 0 6px 12px; box-shadow: 0 1px 1px rgba(0,0,0,.1); }

        #channel-chat-input-area { display: flex; align-items: center; gap: 6px; padding: 8px; background: #ECE5DD; flex-shrink: 0; }
        .ivai-input-wrap { flex: 1; display: flex; align-items: center; background: #fff; border-radius: 24px; padding: 0 6px 0 14px; min-height: 42px; }
        #channel-chat-input { flex: 1; border: none; outline: none; background: transparent; font-size: 15px; padding: 10px 0; min-width: 0; color: #303030; }
        #channel-chat-attach { background: none; border: none; color: #8696a0; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 0; }
        #channel-chat-attach:hover { background: rgba(0,0,0,0.05); }
        #channel-chat-send { width: 44px; height: 44px; border-radius: 50%; border: none; background: #128C7E; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; }
        #channel-chat-send:hover { background: #0f7a6e; }
        .mdi { font-size: 22px; line-height: 1; }

        .channel-message {
            position: relative; max-width: 80%; margin-bottom: 6px; padding: 6px 8px 5px 9px;
            border-radius: 8px; word-break: break-word; font-size: 14.5px; line-height: 1.35;
            color: #303030; box-shadow: 0 1px 1px rgba(0,0,0,.13); width: fit-content;
        }
        .channel-sent { background: #DCF8C6; margin-left: auto; border-top-right-radius: 0; }
        .channel-sent::before { content: ""; position: absolute; top: 0; right: -7px; border-top: 8px solid #DCF8C6; border-right: 8px solid transparent; }
        .channel-received { background: #fff; margin-right: auto; border-top-left-radius: 0; }
        .channel-received::before { content: ""; position: absolute; top: 0; left: -7px; border-top: 8px solid #fff; border-left: 8px solid transparent; }

        .channel-meta { float: right; margin: 6px 0 -2px 10px; font-size: 11px; color: #8a8a8a; display: inline-flex; align-items: center; gap: 3px; line-height: 1; }
        .channel-ack { display: inline-flex; align-items: center; margin: 0; }
        .channel-ack svg { display: block; }
        .channel-message::after { content: ""; display: block; clear: both; }

        .channel-media { max-width: 220px; margin: 2px 0; }
        .channel-media img, .channel-media video { width: 100%; border-radius: 6px; cursor: pointer; display: block; }
        .channel-media audio { width: 100%; }
        .channel-media-document { display: flex; align-items: center; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 6px; text-decoration: none; color: #303030; }
        .channel-media-document i { margin-right: 8px; font-size: 22px; font-style: normal; }
        .channel-media-caption { margin-top: 4px; font-size: 13.5px; color: #303030; }

        .channel-menu-wrapper { display: flex; flex-direction: column; gap: 6px; }
        .channel-menu-title { font-size: 14px; font-weight: 600; color: #075E54; word-break: break-word; }
        .channel-menu-container { display: flex; flex-wrap: wrap; gap: 6px; }
        .channel-menu-pill { border: 1px solid #128C7E; background: #fff; color: #128C7E; padding: 7px 12px; border-radius: 18px; font-size: 13px; cursor: pointer; transition: all .2s ease; max-width: 100%; word-break: break-word; }
        .channel-menu-pill:hover { background: #128C7E; color: #fff; }

        @media (max-width: 480px) {
            #channel-chat-container { width: 100%; height: 100vh; height: 100dvh; bottom: 0; right: 0; border-radius: 0; }
            body:has(#channel-chat-container.show) #channel-chat-widget { display: none; }
        }
    </style>
    `;

    // Adiciona o widget ao documento
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Inicializa o widget
    const chatButton = document.getElementById('channel-chat-button');
    const chatContainer = document.getElementById('channel-chat-container');
    const chatClose = document.getElementById('channel-chat-close');
    const chatClear = document.getElementById('channel-chat-clear');
    const messagesDiv = document.getElementById('channel-chat-messages');
    const messageInput = document.getElementById('channel-chat-input');
    const sendButton = document.getElementById('channel-chat-send');
    const sessionSpan = document.getElementById('channel-chat-session');
    const widgetDiv = document.getElementById('channel-chat-widget');
    const fileInput = document.getElementById('channel-chat-file');
    const attachButton = document.getElementById('channel-chat-attach');

    // Variáveis globais para sessão e token
    let webchatId = null;
    let token = null;
    let ws = null;
    let chatLoaded = false;
    const tenantId = '1';
    // Para ativar logs do widget no console: window.WEBCHAT_DEBUG = true antes do load
    const LOGGER_ENABLED = (typeof window !== 'undefined' && window.WEBCHAT_DEBUG === true);

    // Cabeçalho da conversa (chip "HOJE" + aviso), recriado sempre que a lista é limpa
    function addIntro() {
        const chip = document.createElement('div');
        chip.className = 'ivai-chip';
        chip.innerHTML = '<span>HOJE</span>';
        const notice = document.createElement('div');
        notice.className = 'ivai-notice';
        notice.textContent = 'Você está conversando com a Ivaí. Envie sua mensagem e responderemos o mais breve possível.';
        messagesDiv.appendChild(chip);
        messagesDiv.appendChild(notice);
    }
    addIntro();

    // Funções de controle do widget
    chatButton.addEventListener('click', async () => {
        chatContainer.classList.add('show');
        if (window.matchMedia('(max-width: 480px)').matches) widgetDiv.classList.add('hide');
        if (!chatLoaded) {
            await loadMessageHistory();
            connectWebSocket();
            chatLoaded = true;
        }
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('show');
        widgetDiv.classList.remove('hide');
    });

    // Função para gerar ID único de sessão
    function generateUniqueId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${random}`;
    }
    function generateSessionId() {
        if (!sessionStorage.getItem('channelWebchatId')) {
            sessionStorage.setItem('channelWebchatId', generateUniqueId());
        }
        return sessionStorage.getItem('channelWebchatId');
    }

    // Função para registrar o usuário no backend
    async function registerWebchat() {
        webchatId = generateSessionId();
        const name = 'WebChat ' + webchatId;
        const email = 'webchat@webchat.com';
        const tenantId = '1';
        const wabaId = 'ab9edf1a-9d79-4c68-ba2d-02bac4d890fc';
        const websocketToken = '0ba4525b-c5d9-4b02-b6d6-4ceab021f649';
        const response = await fetch(`https://api7.cobzap.com/webchat/register/${wabaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-websocket-token': websocketToken
            },
            body: JSON.stringify({ webchatId, name, email, tenantId })
        });
        const data = await response.json();
        token = data.token;
        return { webchatId, token };
    }

    // Renova o JWT per-sessão se faltar < 5min para expirar
    async function ensureFreshToken() {
        if (!token) {
            await registerWebchat();
            return;
        }
        try {
            const parts = token.split('.');
            if (parts.length < 2) {
                await registerWebchat();
                return;
            }
            const payload = JSON.parse(atob(parts[1]));
            const expMs = (payload.exp || 0) * 1000;
            if (expMs - Date.now() < 5 * 60 * 1000) {
                await registerWebchat();
            }
        } catch (e) {
            await registerWebchat();
        }
    }

    // Registra a sessão (o ID fica oculto no cabeçalho)
    async function showSessionId() {
        const { webchatId } = await registerWebchat();
        sessionSpan.textContent = `Sessão: ${webchatId}`;
    }
    showSessionId();

    // Função para formatar hora
    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    // Função para formatar texto estilo WhatsApp
    function formatWhatsapp(text) {
        let formatted = String(text || '');
        formatted = formatted.replace(/\*(.*?)\*/g, '<b>$1</b>');
        formatted = formatted.replace(/NEW LINE/gi, '<br>');
        formatted = formatted.replace(/\\n/g, '<br>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function parseMenuMessage(text) {
        const raw = String(text || '').trim();
        if (!raw.startsWith('#MENU')) return null;
        const normalized = raw
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/NEW LINE/gi, '\n')
            .replace(/\\n/g, '\n');
        const lines = normalized.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return null;
        const title = lines[0].replace(/^#MENU\s*/i, '').trim() || 'Escolha uma opcao';
        const items = lines.slice(1).map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        if (!items.length) return null;
        return { title, items };
    }

    function buildMenuHtml(menu) {
        const buttonsHtml = menu.items.map(item => {
            const safe = escapeHtml(item);
            return `<button type="button" class="channel-menu-pill" data-menu-send="${safe}">${safe}</button>`;
        }).join('');
        return `<div class="channel-menu-wrapper"><div class="channel-menu-title">${escapeHtml(menu.title)}</div><div class="channel-menu-container">${buttonsHtml}</div></div>`;
    }


    // Função para construir URL completa da mídia
    function buildMediaUrl(mediaUrl) {
        if (!mediaUrl) return null;
        if (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')) {
            return mediaUrl;
        }
        const baseUrl = `https://api7.cobzap.com/public/${tenantId}`;
        return `${baseUrl}/${mediaUrl}`;
    }

    // Função para adicionar mensagem
    function appendMessage(text, type, time = '', ack = null, id = null, mediaType = null, mediaUrl = null) {
        const messageDiv = document.createElement('div');
        if (id) messageDiv.id = 'msg-' + id;
        messageDiv.className = `channel-message ${type}`;
        let ackHtml = '';
        if (type === 'channel-sent' && ack !== null && ack !== undefined) {
            ackHtml = `<span class="channel-ack">${getAckIcon(ack)}</span>`;
        }

        let contentHtml = '';
        let caption = '';
        
        if (text && text.startsWith('caption: ')) {
            caption = text.substring(9);
            text = '';
        }

        if (mediaType === 'location') {
            const mapsUrl = (text && /^https?:\/\//i.test(text)) ? text : '';
            contentHtml = `<a href="${mapsUrl || '#'}" target="_blank" rel="noopener" class="channel-media-document">
                <i>📍</i> <strong>Localização</strong>${mapsUrl ? '<br><small>Abrir no mapa</small>' : ''}
            </a>`;
        } else if (mediaType === 'vcard') {
            const fnMatch = String(text || '').match(/FN:([^\n]+)/);
            const telMatch = String(text || '').match(/TEL[^:]*:([^\n]+)/);
            const fn = fnMatch ? fnMatch[1].trim() : 'Contato';
            const tel = telMatch ? telMatch[1].trim() : '';
            contentHtml = `<div class="channel-media-document">
                <i>👤</i> <strong>${fn}</strong>${tel ? '<br><small>' + tel + '</small>' : ''}
            </div>`;
        } else if (mediaType && mediaUrl) {
            const fullMediaUrl = buildMediaUrl(mediaUrl);
            switch (mediaType.toLowerCase()) {
                case 'image':
                    contentHtml = `<div class="channel-media">
                        <img src="${fullMediaUrl}" alt="Imagem" onclick="window.open('${fullMediaUrl}', '_blank')">
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'video':
                    contentHtml = `<div class="channel-media">
                        <video controls><source src="${fullMediaUrl}" type="video/mp4"></video>
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'audio':
                    contentHtml = `<div class="channel-media">
                        <audio controls><source src="${fullMediaUrl}" type="audio/mpeg"></audio>
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'document':
                    contentHtml = `<a href="${fullMediaUrl}" class="channel-media-document" target="_blank">
                        <i>📄</i>${caption || 'Documento'}
                    </a>`;
                    break;
                default:
                    contentHtml = `<span>${formatWhatsapp(text)}</span>`;
            }
        } else {

            const menuData = parseMenuMessage(text);
            if (menuData) {
                contentHtml = buildMenuHtml(menuData);
            } else {
                contentHtml = `<span style="white-space:normal;">${formatWhatsapp(text)}</span>`;
            }

        }

        messageDiv.innerHTML = `${contentHtml}<span class="channel-meta">${time}${ackHtml}</span>`;
        messagesDiv.appendChild(messageDiv);

        messageDiv.querySelectorAll('[data-menu-send]').forEach(btn => {
            btn.addEventListener('click', () => {
                messageInput.value = btn.getAttribute('data-menu-send');
                sendButton.click();
            });
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Função para atualizar o ack de uma mensagem
    function updateMessageAck(messageId, ack) {
        const msgDiv = document.getElementById('msg-' + messageId);
        if (msgDiv) {
            const ackSpan = msgDiv.querySelector('.channel-ack');
            if (ackSpan) {
                ackSpan.innerHTML = getAckIcon(ack);
            }
        }
    }

    // Função para obter ícone do ack (tiques no estilo WhatsApp)
    function getAckIcon(ack) {
        const tick1 = (c) => `<svg width="16" height="11" viewBox="0 0 16 11"><path d="M1.5 5.8l3.2 3.2L11 1.6" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const tick2 = (c) => `<svg width="18" height="11" viewBox="0 0 18 11"><path d="M1 5.8l3.2 3.2L10.5 1.6M7 7.6l1.4 1.4 6.6-7.4" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        if (ack === 0) return `<svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.6" fill="none" stroke="#8a8a8a" stroke-width="1.2"/><path d="M6 3.4V6l1.8 1" fill="none" stroke="#8a8a8a" stroke-width="1.2" stroke-linecap="round"/></svg>`;
        if (ack === 1) return tick1('#8a8a8a');
        if (ack === 2) return tick2('#8a8a8a');
        if (ack === 3) return tick2('#53bdeb');
        if (ack === -1) return '❌';
        return '';
    }

    // Função para renderizar o histórico completo
    function renderHistory(messages) {
        messagesDiv.innerHTML = '';
        addIntro();
        messages.forEach(msg => {
            appendMessage(
                msg.body,
                msg.fromMe ? 'channel-received' : 'channel-sent',
                formatTime(msg.createdAt),
                msg.ack,
                msg.id,
                msg.mediaType,
                msg.mediaUrl
            );
        });
    }

    // Função para carregar histórico de mensagens
    async function loadMessageHistory() {
        try {
            await ensureFreshToken();
            const wabaId = 'ab9edf1a-9d79-4c68-ba2d-02bac4d890fc';
            const response = await fetch(`https://api7.cobzap.com/webchat/messages/${wabaId}?from=${webchatId}&tenantId=1`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                renderHistory(data);
            } else {
                LOGGER_ENABLED && console.warn('[WebChat] Resposta da API não é um array:', data);
            }
        } catch (error) {
            LOGGER_ENABLED && console.error('[WebChat] Erro ao carregar histórico:', error);
        }
    }

    // Função para gerar um ID temporário para mensagens enviadas
    function generateTempId() {
        return 'temp-' + Math.random().toString(36).substr(2, 9);
    }

    // Função para atualizar o ID de uma mensagem no DOM
    function updateMessageId(tempId, realId) {
        const tempDiv = document.getElementById('msg-' + tempId);
        if (tempDiv) {
            tempDiv.id = 'msg-' + realId;
        }
    }

    // Função para sanitizar o nome do arquivo
    function sanitizeFileName(filename) {
        if (!filename) return '';
        return filename
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-zA-Z0-9.\-_]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    // Classifica o file.type em image/video/audio/document (PDF, doc, etc. caem em document)
    function classifyMediaType(file) {
        const t = (file && file.type ? String(file.type) : '').toLowerCase();
        if (t.indexOf('image/') === 0) return 'image';
        if (t.indexOf('video/') === 0) return 'video';
        if (t.indexOf('audio/') === 0) return 'audio';
        return 'document';
    }

    // Função para enviar mídia
    async function sendMedia(file) {
        const sanitizedFileName = sanitizeFileName(file.name);
        const formData = new FormData();

        formData.append('medias', file, sanitizedFileName);

        const data = {
            body: 'caption: ' + (messageInput.value.trim() || 'Mídia enviada'),
            from: webchatId,
            name: webchatId,
            email: webchatId + '@webchat.com',
            tenantId: '1',
            event: 'messages.upsert',
            fromMe: false,
            channel: 'webchat',
            type: 'webchat',
            webchatId: webchatId,
            mediaType: classifyMediaType(file),
            fileName: sanitizedFileName
        };

        formData.append('data', JSON.stringify(data));

        try {
            await ensureFreshToken();
            const wabaId = 'ab9edf1a-9d79-4c68-ba2d-02bac4d890fc';

            const response = await fetch(`https://api7.cobzap.com/webchat-webhook/${wabaId}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            });
            
            const responseText = await response.text();

            let respData = {};
            if (responseText) {
                try {
                    respData = JSON.parse(responseText);
                } catch (parseError) {
                    LOGGER_ENABLED && console.error('[WebChat] Erro ao fazer parse da resposta:', parseError);
                    throw new Error('Resposta inválida do servidor');
                }
            }

            if (!response.ok) {
                throw new Error(respData.message || 'Erro ao enviar mídia');
            }

            messageInput.value = '';
            
            const tempId = generateTempId();
            appendMessage(
                data.body,
                'channel-sent',
                formatTime(new Date().toISOString()),
                0,
                tempId,
                data.mediaType,
                null
            );

            await loadMessageHistory();

        } catch (error) {
            LOGGER_ENABLED && console.error('[WebChat] Erro detalhado ao enviar mídia:', {
                mensagem: error.message,
                stack: error.stack,
                erro: error
            });
            alert('Erro ao enviar mídia. Por favor, tente novamente.');
        }
    }

    // Event listeners para envio de mensagem
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            const tempId = generateTempId();
            appendMessage(message, 'channel-sent', formatTime(new Date().toISOString()), 0, tempId);
            messageInput.value = '';
            const data = {
                body: message,
                from: webchatId,
                name: webchatId,
                email: webchatId + '@webchat.com',
                tenantId: '1',
                event: 'messages.upsert',
                fromMe: false,
                channel: 'webchat',
                type: 'webchat',
                webchatId: webchatId
            };
            try {
                await ensureFreshToken();
                const wabaId = 'ab9edf1a-9d79-4c68-ba2d-02bac4d890fc';
                const response = await fetch(`https://api7.cobzap.com/webchat-webhook/${wabaId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                const respData = await response.json();
                if (respData && respData.id) {
                    updateMessageId(tempId, respData.id);
                }
                if (respData && respData.mediaUrl) {
                    appendMessage(
                        respData.body,
                        'channel-sent',
                        formatTime(new Date().toISOString()),
                        0,
                        respData.id || tempId,
                        respData.mediaType,
                        respData.mediaUrl
                    );
                }

                await loadMessageHistory();

            } catch (error) {
                LOGGER_ENABLED && console.error('[WebChat] Erro ao enviar mensagem:', error);
            }
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Event listener para o botão de anexo
    attachButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Event listener para seleção de arquivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            sendMedia(file);
        }
        fileInput.value = '';
    });

    // WebSocket para receber mensagens e ack em tempo real
    function connectWebSocket() {
        if (!webchatId || !token) return;
        
        let pingInterval;
        let historyInterval;
        let reconnectAttempts = 0;
        const MAX_RECONNECT_ATTEMPTS = 5;
        const RECONNECT_DELAY = 5000;
        const PING_INTERVAL = 30000;
        const HISTORY_INTERVAL = 60000;

        function connect() {
            ws = new WebSocket(`wss://api7.cobzap.com/wss?from=${webchatId}&token=${token}`);
            
            ws.onopen = () => {
                LOGGER_ENABLED && console.log('[WebChat] WebSocket conectado!');
                reconnectAttempts = 0;
                
                pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'ping' }));
                    }
                }, PING_INTERVAL);

                historyInterval = setInterval(async () => {
                    if (ws.readyState === WebSocket.OPEN) {
                        await loadMessageHistory();
                    }
                }, HISTORY_INTERVAL);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'webhook' && data.payload && data.payload.message) {
                        const msg = data.payload.message;
                        appendMessage(
                            msg.body,
                            'channel-received',
                            formatTime(msg.createdAt),
                            msg.ack,
                            msg.id,
                            msg.mediaType,
                            msg.mediaUrl
                        );
                        if (msg.mediaType) {
                            loadMessageHistory();
                        }
                    }
                    if (data.type === 'ack_update' && data.payload) {
                        if (data.payload.mediaType) {
                            const msgDiv = document.getElementById('msg-' + data.payload.id);
                            if (msgDiv) {
                                msgDiv.remove();
                                appendMessage(
                                    data.payload.body,
                                    'channel-sent',
                                    formatTime(data.payload.createdAt),
                                    data.payload.ack,
                                    data.payload.id,
                                    data.payload.mediaType,
                                    data.payload.mediaUrl
                                );
                            }
                        } else {
                            updateMessageAck(data.payload.messageId, data.payload.ack);
                        }
                    }
                    if (data.type === 'pong') {
                        LOGGER_ENABLED && console.log('[WebChat] Pong recebido');
                    }
                } catch (error) {
                    LOGGER_ENABLED && console.error('[WebChat] Erro ao processar mensagem WebSocket:', error);
                }
            };

            ws.onerror = (error) => {
                LOGGER_ENABLED && console.error('[WebChat] Erro na conexão WebSocket:', error);
            };

            ws.onclose = () => {
                LOGGER_ENABLED && console.log('[WebChat] Conexão WebSocket fechada');
                clearInterval(pingInterval);
                clearInterval(historyInterval);
                
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    LOGGER_ENABLED && console.log(`[WebChat] Tentando reconectar (tentativa ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
                    setTimeout(connect, RECONNECT_DELAY);
                } else {
                    LOGGER_ENABLED && console.error('[WebChat] Número máximo de tentativas de reconexão atingido');
                }
            };
        }

        connect();
    }

    // Função para limpar a sessão
    async function clearSession() {
        if (confirm('Tem certeza que deseja limpar a sessão e começar uma nova conversa?')) {
            messagesDiv.innerHTML = '';
            addIntro();
            sessionStorage.removeItem('channelWebchatId');
            if (ws) {
                ws.close();
            }
            webchatId = null;
            token = null;
            chatLoaded = false;
            await showSessionId();
            await loadMessageHistory();
            connectWebSocket();
        }
    }

    chatClear.addEventListener('click', clearSession);
})();

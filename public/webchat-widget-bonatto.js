// Widget de Chat CHANNEL — tema WhatsApp / Bonatto & Bonatto
(function() {
    const AVATAR = '/bonatto-logo.png';
    const BADGE_SVG = '<svg class="ivai-verified" viewBox="0 0 24 24" width="16" height="16" aria-label="Conta verificada"><path fill="#25D366" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z"/><path fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M7.8 12.3l3 3 5.6-6"/></svg>';

    const widgetHTML = `
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" rel="stylesheet">
    <div id="channel-chat-widget">
        <button id="channel-chat-button" aria-label="Abrir chat">
            <img src="${AVATAR}" alt="Bonatto &amp; Bonatto Advogados Associados">
        </button>
    </div>

    <div id="channel-chat-container">
        <div id="channel-chat-header">
            <button id="channel-chat-close" title="Fechar" aria-label="Fechar"><i class="mdi mdi-arrow-left"></i></button>
            <img class="ivai-avatar" src="${AVATAR}" alt="Bonatto &amp; Bonatto Advogados Associados">
            <div class="ivai-title">
                <div class="ivai-name"><span>Bonatto &amp; Bonatto Advogados Associados</span>${BADGE_SVG}</div>
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
        notice.textContent = 'Você está conversando com o escritório Bonatto & Bonatto Advogados Associados. Envie sua mensagem e responderemos o mais breve possível.';
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
        const wabaId = '1f3b7b06-8b1e-4a74-9a29-df767b03f3cd';
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
            const wabaId = '1f3b7b06-8b1e-4a74-9a29-df767b03f3cd';
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
            const wabaId = '1f3b7b06-8b1e-4a74-9a29-df767b03f3cd';

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
                const wabaId = '1f3b7b06-8b1e-4a74-9a29-df767b03f3cd';
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

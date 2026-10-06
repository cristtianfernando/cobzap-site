'use client';

import Script from 'next/script';

// Página isolada (/chat): só o chat do WebChat, em tela cheia. O CSS é do componente,
// então só existe enquanto a página está montada. !important porque o widget injeta o CSS dele depois.
const css = `
html, body { margin: 0; height: 100%; background: #f7fafd; }
#channel-chat-widget, #channel-chat-close { display: none !important; }
#channel-chat-container { width: 100% !important; height: 100vh !important; height: 100dvh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
#channel-chat-header { border-radius: 0 !important; }
`;

export default function ChatPage() {
  // onReady roda após o load e a cada montagem (o next/script não reexecuta o widget se já carregado).
  // O click só adiciona a classe 'show', então é idempotente.
  return (
    <>
      <style>{css}</style>
      <Script
        src="/webchat-widget-ivai.js"
        strategy="afterInteractive"
        onReady={() => document.getElementById('channel-chat-button')?.click()}
      />
    </>
  );
}

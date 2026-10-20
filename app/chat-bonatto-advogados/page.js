'use client';

import Script from 'next/script';

// Página dedicada ao webchat em tela cheia, com o visual usado em /chat-bonatto.
const css = `
html, body { margin: 0; height: 100%; background: #ECE5DD; }
#channel-chat-widget, #channel-chat-close { display: none !important; }
#channel-chat-container { width: 100% !important; height: 100vh !important; height: 100dvh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
#channel-chat-header { border-radius: 0 !important; }
`;

export default function ChatPage() {
  return (
    <>
      <style>{css}</style>
      <Script
        src="/webchat-widget-bonatto-advogados.js"
        strategy="afterInteractive"
        onReady={() => {
          // Aguarda o registro inicial antes de abrir para evitar cadastro duplicado.
          let done = false;
          const open = () => {
            if (!done) {
              done = true;
              document.getElementById('channel-chat-button')?.click();
            }
          };
          const session = document.getElementById('channel-chat-session');
          if (!session || session.textContent) return open();
          new MutationObserver((_, observer) => {
            observer.disconnect();
            open();
          }).observe(session, { childList: true });
          setTimeout(open, 5000);
        }}
      />
    </>
  );
}

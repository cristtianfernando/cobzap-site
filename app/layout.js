import './globals.css';

export const metadata = {
  title: 'CobZap | Sistema de Cobrança via WhatsApp com API Oficial Meta',
  description: 'CobZap é o sistema de cobrança via WhatsApp mais completo do Brasil. Use a API Oficial da Meta ou WhatsApp Web para automatizar réguas de cobrança, recuperar dívidas e reduzir inadimplência. A partir de R$47/usuário/mês. Compatível com LGPD.',
  keywords: 'sistema de cobrança WhatsApp, API WhatsApp cobrança, API oficial Meta cobrança, assessoria de cobrança WhatsApp, escritório de cobrança WhatsApp, call center cobrança WhatsApp, telemarketing cobrança WhatsApp, régua de cobrança WhatsApp, automação de cobrança WhatsApp, recuperação de dívidas WhatsApp, cobzap, disparo em massa WhatsApp, inadimplência WhatsApp, cobrança ativa WhatsApp, recuperação de crédito WhatsApp',
  metadataBase: new URL('https://www.cobzap.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'CobZap | Sistema de Cobrança via WhatsApp com API Oficial Meta',
    description: 'Automatize cobranças pelo WhatsApp com API Oficial da Meta ou WhatsApp Web. Régua de cobrança, disparo em massa e dashboard em tempo real. A partir de R$47/usuário/mês.',
    images: [
      {
        url: '/logo.png',
      },
    ],
    locale: 'pt_BR',
    siteName: 'CobZap',
  },
  twitter: {
    card: 'summary_large_image',
    url: '/',
    title: 'CobZap | Sistema de Cobrança via WhatsApp com API Oficial Meta',
    description: 'Automatize cobranças pelo WhatsApp. API Oficial Meta ou WhatsApp Web. A partir de R$47/usuário/mês.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  // LD+JSON do SoftwareApplication
  const ldSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CobZap",
    "url": "https://www.cobzap.com",
    "logo": "https://www.cobzap.com/logo.png",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": "CobZap é um sistema de cobrança via WhatsApp que conecta a API Oficial da Meta (Cloud API) ou WhatsApp Web para automatizar régua de cobrança, disparo em massa e gestão de devedores, com dashboard de performance em tempo real e conformidade com LGPD.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      "lowPrice": "47.00",
      "highPrice": "97.00",
      "offerCount": "6"
    },
    "featureList": [
      "API Oficial do WhatsApp da Meta (Cloud API)",
      "Integração via WhatsApp Web (QR Code)",
      "Régua de cobrança automatizada",
      "Disparo em massa de mensagens personalizadas",
      "Dashboard de performance em tempo real",
      "Relatórios avançados por usuário e fila",
      "Webhooks e API REST para integração com ERP/CRM",
      "Conformidade com LGPD",
      "Multi-atendentes simultâneos",
      "Histórico completo de conversas"
    ]
  };

  // LD+JSON da Organization
  const ldOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CobZap",
    "url": "https://www.cobzap.com",
    "logo": "https://www.cobzap.com/logo.png",
    "email": "contato@cobzap.com",
    "telephone": "+55-41-99549-1030",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-41-99549-1030",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.linkedin.com/company/cobzap",
      "https://www.instagram.com/cobzap/",
      "https://www.facebook.com/profile.php?id=61584667976947"
    ]
  };

  // LD+JSON do WebSite
  const ldWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CobZap",
    "url": "https://www.cobzap.com",
    "description": "Sistema de cobrança via WhatsApp com API Oficial Meta e WhatsApp Web. Automatize réguas de cobrança e reduza inadimplência.",
    "inLanguage": "pt-BR"
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebSite) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

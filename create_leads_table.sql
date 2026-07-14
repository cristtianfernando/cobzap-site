-- Criação da tabela para armazenar os dados do formulário de captação
USE bd_cobzap;

CREATE TABLE IF NOT EXISTS leads_captacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    tamanho_time VARCHAR(20) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_usuario VARCHAR(45),
    user_agent TEXT,
    origem VARCHAR(100) DEFAULT 'site_cobzap'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para melhorar a performance de consultas
CREATE INDEX idx_email ON leads_captacao(email);
CREATE INDEX idx_whatsapp ON leads_captacao(whatsapp);
CREATE INDEX idx_data_cadastro ON leads_captacao(data_cadastro);

-- Comentários sobre os campos da tabela
-- id: Identificador único do registro
-- nome: Nome completo do lead
-- email: Endereço de e-mail do lead
-- whatsapp: Número de WhatsApp do lead (formato: (XX) XXXXX-XXXX)
-- cargo: Cargo do lead na empresa
-- tamanho_time: Tamanho da equipe (1 a 5, 5 a 10, 10 a 20, 20 a 50, 50 a 100, 100+)
-- data_cadastro: Data e hora do cadastro
-- ip_usuario: Endereço IP do usuário no momento do cadastro
-- user_agent: Informações do navegador/dispositivo do usuário
-- origem: Origem do lead (padrão: site_cobzap)

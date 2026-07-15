const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  }

  try {
    const data = req.body;

    const nome = (data.nome || '').trim();
    const email = (data.email || '').trim();
    const whatsapp = (data.telefone_formatado || data.telefone || data.whatsapp || '').trim();
    const cargo = (data.cargo || '').trim();
    const tamanho_time = (data.tamanho_time || data.tamanho_equipe || '').trim();
    const origem = (data.origem || 'gate-cobchat').trim();

    // Validação
    const missingFields = [];
    if (!nome) missingFields.push('nome');
    if (!email) missingFields.push('email');
    if (!whatsapp) missingFields.push('telefone');
    if (!cargo) missingFields.push('cargo');
    if (!tamanho_time) missingFields.push('tamanho_time');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
      });
    }

    // Obter IP e User Agent
    const ip_usuario = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const user_agent = req.headers['user-agent'] || '';

    // Conectar ao MySQL usando variáveis de ambiente
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    const query = `
      INSERT INTO leads_captacao (nome, email, whatsapp, empresa, cargo, tamanho_equipe, ip_usuario, user_agent, origem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
      nome,
      email,
      whatsapp,
      '', // Empresa (campo ausente no formulário)
      cargo,
      tamanho_time, // Mapeado para tamanho_equipe da tabela existente
      ip_usuario,
      user_agent,
      origem
    ]);

    await connection.end();

    return res.status(200).json({
      success: true,
      message: 'Dados salvos com sucesso!'
    });

  } catch (error) {
    console.error('Erro na função salvar_lead:', error);
    return res.status(500).json({
      success: false,
      message: `Erro ao salvar os dados no banco: ${error.message}`
    });
  }
};

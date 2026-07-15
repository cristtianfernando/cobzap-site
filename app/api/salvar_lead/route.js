import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();

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
      return NextResponse.json(
        {
          success: false,
          message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
        },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Obter IP e User Agent a partir dos headers
    const ip_usuario = request.headers.get('x-forwarded-for') || '';
    const user_agent = request.headers.get('user-agent') || '';

    // Conectar ao MySQL
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

    await connection.execute(query, [
      nome,
      email,
      whatsapp,
      '', // Empresa (campo ausente no formulário)
      cargo,
      tamanho_time, // Mapeado para tamanho_equipe da tabela existente
      ip_usuario,
      user_agent,
      origem,
    ]);

    await connection.end();

    return NextResponse.json(
      {
        success: true,
        message: 'Dados salvos com sucesso!',
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    console.error('Erro na API salvar_lead:', error);
    return NextResponse.json(
      {
        success: false,
        message: `Erro ao salvar os dados no banco: ${error.message}`,
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

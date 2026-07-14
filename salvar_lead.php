<?php
// Configurar resposta como JSON
header('Content-Type: application/json; charset=utf-8');

// Permitir requisições de outros domínios se necessário (CORS)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Responder requisições OPTIONS de pré-voo do CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Carregar variáveis de ambiente do .env
require_once __DIR__ . '/env_loader.php';

$host = $_ENV['DB_HOST'] ?? 'localhost';
$port = $_ENV['DB_PORT'] ?? '3306';
$dbname = $_ENV['DB_DATABASE'] ?? '';
$username = $_ENV['DB_USERNAME'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';

// Receber dados do formulário
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados foram recebidos
if (!$data) {
    // Tentar obter dados via POST
    $data = $_POST;
}

// Normalizar campos para compatibilidade
$nome = trim($data['nome'] ?? '');
$email = trim($data['email'] ?? '');
$whatsapp = trim($data['telefone_formatado'] ?? $data['telefone'] ?? $data['whatsapp'] ?? '');
$cargo = trim($data['cargo'] ?? '');
$tamanho_time = trim($data['tamanho_time'] ?? $data['tamanho_equipe'] ?? '');
$origem = trim($data['origem'] ?? 'gate-cobchat');

// Verificar se todos os campos necessários estão presentes
$missing_fields = [];
if (empty($nome)) $missing_fields[] = 'nome';
if (empty($email)) $missing_fields[] = 'email';
if (empty($whatsapp)) $missing_fields[] = 'telefone';
if (empty($cargo)) $missing_fields[] = 'cargo';
if (empty($tamanho_time)) $missing_fields[] = 'tamanho_time';

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Campos obrigatórios ausentes: ' . implode(', ', $missing_fields)
    ]);
    exit;
}

try {
    // Conectar ao banco de dados
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Preparar a consulta SQL (atualizada conforme o formulário)
    $sql = "INSERT INTO leads_captacao (nome, email, whatsapp, cargo, tamanho_time, ip_usuario, user_agent, origem) 
            VALUES (:nome, :email, :whatsapp, :cargo, :tamanho_time, :ip_usuario, :user_agent, :origem)";
    
    $stmt = $pdo->prepare($sql);
    
    // Obter IP e User Agent
    $ip_usuario = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Vincular parâmetros
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':whatsapp', $whatsapp);
    $stmt->bindParam(':cargo', $cargo);
    $stmt->bindParam(':tamanho_time', $tamanho_time);
    $stmt->bindParam(':ip_usuario', $ip_usuario);
    $stmt->bindParam(':user_agent', $user_agent);
    $stmt->bindParam(':origem', $origem);
    
    // Executar a consulta
    $stmt->execute();
    
    // Retornar sucesso
    echo json_encode([
        'success' => true,
        'message' => 'Dados salvos com sucesso!'
    ]);
    
} catch (PDOException $e) {
    // Erro na conexão ou execução da consulta
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao salvar os dados no banco: ' . $e->getMessage()
    ]);
}

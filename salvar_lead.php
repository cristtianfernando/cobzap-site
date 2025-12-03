<?php
// Configurações do banco de dados
$host = 'cloud.bonattoadvogados.com.br';
$port = '5675';
$dbname = 'bd_cobzap';
$username = 'bonatto';
$password = 'KY&pAhYe4f';

// Receber dados do formulário
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados foram recebidos
if (!$data) {
    // Tentar obter dados via POST
    $data = $_POST;
}

// Verificar se todos os campos necessários estão presentes
$required_fields = ['nome', 'email', 'whatsapp', 'empresa', 'cargo', 'tamanho_equipe'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing_fields[] = $field;
    }
}

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
    
    // Preparar a consulta SQL
    $sql = "INSERT INTO leads_captacao (nome, email, whatsapp, empresa, cargo, tamanho_equipe, ip_usuario, user_agent) 
            VALUES (:nome, :email, :whatsapp, :empresa, :cargo, :tamanho_equipe, :ip_usuario, :user_agent)";
    
    $stmt = $pdo->prepare($sql);
    
    // Obter IP e User Agent
    $ip_usuario = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Vincular parâmetros
    $stmt->bindParam(':nome', $data['nome']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':whatsapp', $data['whatsapp']);
    $stmt->bindParam(':empresa', $data['empresa']);
    $stmt->bindParam(':cargo', $data['cargo']);
    $stmt->bindParam(':tamanho_equipe', $data['tamanho_equipe']);
    $stmt->bindParam(':ip_usuario', $ip_usuario);
    $stmt->bindParam(':user_agent', $user_agent);
    
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
        'message' => 'Erro ao salvar os dados: ' . $e->getMessage()
    ]);
}

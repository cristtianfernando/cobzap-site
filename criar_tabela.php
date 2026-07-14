<?php
// Carregar variáveis de ambiente do .env
require_once __DIR__ . '/env_loader.php';

$host = $_ENV['DB_HOST'] ?? 'localhost';
$port = $_ENV['DB_PORT'] ?? '3306';
$dbname = $_ENV['DB_DATABASE'] ?? '';
$username = $_ENV['DB_USERNAME'] ?? '';
$password = $_ENV['DB_PASSWORD'] ?? '';

try {
    // Conectar ao banco de dados
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    
    echo "<h2>Conectado ao banco de dados com sucesso!</h2>";
    
    // SQL para criar a tabela
    $sql = "CREATE TABLE IF NOT EXISTS leads_captacao (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    // Executar o SQL
    $pdo->exec($sql);
    echo "<p>Tabela 'leads_captacao' criada/verificada com sucesso!</p>";
    
    // Criar índices (com tratamento para o caso de já existirem em versões mais antigas do MySQL)
    try {
        @$pdo->exec("CREATE INDEX idx_email ON leads_captacao(email)");
        @$pdo->exec("CREATE INDEX idx_whatsapp ON leads_captacao(whatsapp)");
        @$pdo->exec("CREATE INDEX idx_data_cadastro ON leads_captacao(data_cadastro)");
        echo "<p>Índices criados ou já existentes!</p>";
    } catch (PDOException $e) {
        // Ignora erros de índice duplicado
    }

    
    // Listar tabelas existentes
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Tabelas existentes no banco de dados:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        echo "<li>$table</li>";
    }
    echo "</ul>";
    
} catch (PDOException $e) {
    // Erro na conexão ou execução da consulta
    echo "<h2>Erro ao conectar ou criar tabela:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>

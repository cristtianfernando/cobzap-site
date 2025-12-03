<?php
// Configurações do banco de dados
$host = 'cloud.bonattoadvogados.com.br';
$port = '5675';
$dbname = 'bd_cobzap';
$username = 'bonatto';
$password = 'KY&pAhYe4f';

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
        empresa VARCHAR(100) NOT NULL,
        cargo VARCHAR(100) NOT NULL,
        tamanho_equipe VARCHAR(20) NOT NULL,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_usuario VARCHAR(45),
        user_agent TEXT,
        origem VARCHAR(100) DEFAULT 'site_cobchat'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    // Executar o SQL
    $pdo->exec($sql);
    echo "<p>Tabela 'leads_captacao' criada com sucesso!</p>";
    
    // Criar índices
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_email ON leads_captacao(email)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_whatsapp ON leads_captacao(whatsapp)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_data_cadastro ON leads_captacao(data_cadastro)");
    echo "<p>Índices criados com sucesso!</p>";
    
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

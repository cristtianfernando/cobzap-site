<?php
// Configurações do banco de dados
$host = 'cloud.bonattoadvogados.com.br';
$port = '5675';
$dbname = 'bd_cobzap';
$username = 'bonatto';
$password = 'KY&pAhYe4f';

// Conectar ao banco de dados
$mysqli = new mysqli($host, $username, $password, $dbname, $port);

// Verificar conexão
if ($mysqli->connect_error) {
    die("Falha na conexão: " . $mysqli->connect_error);
}

echo "Conectado ao banco de dados com sucesso!<br>";

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
)";

// Executar o SQL
if ($mysqli->query($sql) === TRUE) {
    echo "Tabela 'leads_captacao' criada com sucesso!<br>";
} else {
    echo "Erro ao criar tabela: " . $mysqli->error . "<br>";
}

// Criar índices
$indices = [
    "CREATE INDEX IF NOT EXISTS idx_email ON leads_captacao(email)",
    "CREATE INDEX IF NOT EXISTS idx_whatsapp ON leads_captacao(whatsapp)",
    "CREATE INDEX IF NOT EXISTS idx_data_cadastro ON leads_captacao(data_cadastro)"
];

foreach ($indices as $index_sql) {
    if ($mysqli->query($index_sql) === TRUE) {
        echo "Índice criado com sucesso!<br>";
    } else {
        echo "Erro ao criar índice: " . $mysqli->error . "<br>";
    }
}

// Listar tabelas existentes
$result = $mysqli->query("SHOW TABLES");
if ($result) {
    echo "<h3>Tabelas existentes no banco de dados:</h3>";
    echo "<ul>";
    while ($row = $result->fetch_array()) {
        echo "<li>" . $row[0] . "</li>";
    }
    echo "</ul>";
}

// Fechar conexão
$mysqli->close();
?>

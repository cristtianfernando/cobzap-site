<?php
/**
 * Utilitário simples para carregar variáveis de ambiente de um arquivo .env
 */
function carregarEnv($diretorio) {
    $caminho = rtrim($diretorio, '/') . '/.env';
    
    if (!file_exists($caminho)) {
        return false;
    }

    $linhas = file($caminho, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($linhas as $linha) {
        // Ignorar comentários
        $linha = trim($linha);
        if (empty($linha) || strpos($linha, '#') === 0) {
            continue;
        }

        // Dividir no primeiro "="
        $partes = explode('=', $linha, 2);
        if (count($partes) === 2) {
            $chave = trim($partes[0]);
            $valor = trim($partes[1]);

            // Remover aspas do início e fim do valor
            $valor = trim($valor, "\"'");

            // Definir no ambiente
            putenv("$chave=$valor");
            $_ENV[$chave] = $valor;
            $_SERVER[$chave] = $valor;
        }
    }
    return true;
}

// Carregar o .env do diretório atual
carregarEnv(__DIR__);

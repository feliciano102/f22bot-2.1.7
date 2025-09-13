#!/bin/bash

# Script de inicialização para KnightBot-MD
echo "Iniciando KnightBot-MD..."

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não encontrado. Por favor, instale o Node.js para continuar."
    exit 1
fi

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

# Opções de inicialização
echo "Escolha uma opção de inicialização:"
echo "1. Iniciar normalmente"
echo "2. Iniciar com otimização de memória"
echo "3. Limpar e iniciar"
echo "4. Resetar sessão e iniciar"
read -p "Opção (1-4): " option

case $option in
    1)
        echo "Iniciando bot normalmente..."
        npm start
        ;;
    2)
        echo "Iniciando bot com otimização de memória..."
        npm run start:optimized
        ;;
    3)
        echo "Limpando e iniciando bot..."
        npm run start:clean
        ;;
    4)
        echo "Resetando sessão e iniciando bot..."
        npm run start:fresh
        ;;
    *)
        echo "Opção inválida. Iniciando normalmente..."
        npm start
        ;;
esac
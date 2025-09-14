#!/data/data/com.termux/files/usr/bin/bash

# Script de inicialização otimizado para Termux
echo "=== KnightBot-MD - Inicialização para Termux ==="

# Verifica se as dependências estão instaladas
if ! command -v ffmpeg &> /dev/null || ! command -v convert &> /dev/null; then
    echo "Algumas dependências estão faltando. Execute termux-setup.sh primeiro."
    exit 1
fi

# Limpa o cache do Termux para liberar memória
echo "Limpando cache para otimizar memória..."
apt clean
rm -rf /data/data/com.termux/cache/*

# Opções de inicialização
echo "Escolha uma opção de inicialização:"
echo "1. Iniciar normalmente"
echo "2. Iniciar com otimização de memória (recomendado para Termux)"
echo "3. Limpar e iniciar"
echo "4. Resetar sessão e iniciar"
echo "5. Iniciar em segundo plano (usando nohup)"
read -p "Opção (1-5): " option

case $option in
    1)
        echo "Iniciando bot normalmente..."
        npm start
        ;;
    2)
        echo "Iniciando bot com otimização de memória..."
        node --max-old-space-size=256 --optimize-for-size --gc-interval=100 index.js
        ;;
    3)
        echo "Limpando e iniciando bot..."
        rm -rf tmp/* temp/*
        node --max-old-space-size=256 --optimize-for-size --gc-interval=100 index.js
        ;;
    4)
        echo "Resetando sessão e iniciando bot..."
        rm -rf session
        mkdir -p session
        npm start
        ;;
    5)
        echo "Iniciando bot em segundo plano..."
        nohup node --max-old-space-size=256 --optimize-for-size --gc-interval=100 index.js > bot.log 2>&1 &
        echo "Bot iniciado em segundo plano. Logs em bot.log"
        echo "Para ver os logs: tail -f bot.log"
        echo "Para parar o bot: pkill -f 'node --max-old-space-size=256'"
        ;;
    *)
        echo "Opção inválida. Iniciando com otimização de memória..."
        node --max-old-space-size=256 --optimize-for-size --gc-interval=100 index.js
        ;;
esac
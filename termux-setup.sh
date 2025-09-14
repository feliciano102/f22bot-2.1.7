#!/data/data/com.termux/files/usr/bin/bash

# Script de instalação para KnightBot-MD no Termux
echo "=== Instalação do KnightBot-MD para Termux ==="
echo "Instalando dependências necessárias..."

# Atualiza os repositórios e pacotes do Termux
pkg update -y && pkg upgrade -y

# Instala dependências básicas
pkg install -y nodejs
pkg install -y git
pkg install -y ffmpeg
pkg install -y imagemagick
pkg install -y libwebp
pkg install -y wget
pkg install -y python

# Instala dependências para processamento de imagem e áudio
pkg install -y proot
pkg install -y tesseract
pkg install -y opus-tools

# Cria diretórios necessários
mkdir -p temp
mkdir -p tmp

# Instala as dependências do Node.js
echo "Instalando dependências do Node.js..."
npm install --no-audit

# Verifica se a instalação foi bem-sucedida
if [ -d "node_modules" ]; then
    echo "=== Instalação concluída com sucesso! ==="
    echo "Para iniciar o bot, execute: bash start.sh"
else
    echo "=== Erro na instalação das dependências! ==="
    echo "Tente executar manualmente: npm install --force"
fi

echo "=== Configuração concluída! ==="
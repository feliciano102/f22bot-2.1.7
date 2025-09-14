#!/data/data/com.termux/files/usr/bin/bash

# Script para corrigir problemas comuns no Termux
echo "=== KnightBot-MD - Ferramenta de Correção para Termux ==="

# Verifica se está rodando no Termux
if [ ! -d "/data/data/com.termux/files/usr" ]; then
    echo "Este script deve ser executado no Termux!"
    exit 1
fi

echo "Escolha uma opção de correção:"
echo "1. Corrigir problemas de memória"
echo "2. Reinstalar dependências"
echo "3. Corrigir permissões"
echo "4. Limpar arquivos temporários"
echo "5. Corrigir todos os problemas"
read -p "Opção (1-5): " option

fix_memory() {
    echo "Corrigindo problemas de memória..."
    apt clean
    rm -rf /data/data/com.termux/cache/*
    echo "Memória otimizada!"
}

reinstall_deps() {
    echo "Reinstalando dependências..."
    pkg update -y && pkg upgrade -y
    pkg install -y nodejs git ffmpeg imagemagick libwebp wget python proot tesseract opus-tools
    npm install --force
    echo "Dependências reinstaladas!"
}

fix_permissions() {
    echo "Corrigindo permissões..."
    chmod +x *.sh
    chmod 755 -R node_modules
    echo "Permissões corrigidas!"
}

clean_temp() {
    echo "Limpando arquivos temporários..."
    rm -rf tmp/* temp/*
    rm -rf .npm/_cacache
    rm -rf baileys_store.json
    echo "Arquivos temporários limpos!"
}

case $option in
    1)
        fix_memory
        ;;
    2)
        reinstall_deps
        ;;
    3)
        fix_permissions
        ;;
    4)
        clean_temp
        ;;
    5)
        echo "Corrigindo todos os problemas..."
        fix_memory
        reinstall_deps
        fix_permissions
        clean_temp
        echo "Todos os problemas foram corrigidos!"
        ;;
    *)
        echo "Opção inválida!"
        exit 1
        ;;
esac

echo "=== Correção concluída! ==="
echo "Agora você pode iniciar o bot com: ./termux-start.sh"
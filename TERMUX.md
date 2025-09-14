# Instalação do KnightBot-MD no Termux

Este guia explica como instalar e executar o KnightBot-MD no aplicativo Termux para Android.

## Requisitos

- Um dispositivo Android
- [Aplicativo Termux](https://f-droid.org/en/packages/com.termux/) instalado (recomendado baixar da F-Droid)
- Pelo menos 500MB de espaço livre
- Conexão com a internet

## Passos para Instalação

1. Abra o Termux e execute os seguintes comandos:

```bash
# Atualize o Termux
pkg update -y && pkg upgrade -y

# Instale o Git
pkg install -y git

# Clone o repositório
git clone https://github.com/feliciano102/f22bot-2.1.7.git

# Entre na pasta do projeto
cd f22bot-2.1.7

# Dê permissão de execução aos scripts
chmod +x termux-setup.sh
chmod +x start.sh

# Execute o script de instalação
./termux-setup.sh
```

2. Aguarde a instalação ser concluída. Isso pode levar alguns minutos dependendo da sua conexão com a internet.

## Iniciando o Bot

Após a instalação, você pode iniciar o bot usando um dos seguintes comandos:

```bash
# Inicialização padrão
./start.sh

# OU inicialização otimizada para Termux (recomendado)
./termux-start.sh
```

O script `termux-start.sh` é especialmente otimizado para o ambiente Termux com opções adicionais:

- Otimização de memória (recomendado para a maioria dos dispositivos)
- Execução em segundo plano (permite fechar o Termux mantendo o bot rodando)
- Limpeza automática de cache para melhor desempenho

Escolha uma das opções de inicialização quando solicitado.

## Solução de Problemas

Se você encontrar algum erro durante a instalação ou execução, tente os seguintes passos:

1. **Erro de memória**: 
   - Use o script `termux-start.sh` com a opção 2 (otimização de memória)
   - Feche outros aplicativos em segundo plano
   - Execute este comando para limpar o cache do Termux:
     ```bash
     apt clean && rm -rf /data/data/com.termux/cache/*
     ```

2. **Erro de dependências**: Execute manualmente:
   ```bash
   pkg update -y && pkg upgrade -y
   pkg install -y nodejs ffmpeg imagemagick libwebp
   npm install --force
   ```

3. **Erro de permissão**: Certifique-se de que os scripts têm permissão de execução:
   ```bash
   chmod +x *.sh
   ```

4. **Termux fechando inesperadamente**: 
   - Use a opção 5 no `termux-start.sh` para executar em segundo plano
   - Instale e use tmux para manter o bot rodando:
     ```bash
     pkg install tmux
     tmux new -s bot
     # Execute o bot dentro da sessão tmux
     # Para sair sem fechar: pressione Ctrl+b, depois d
     # Para retornar: tmux attach -t bot
     ```

5. **Problemas com FFmpeg ou ImageMagick**:
   ```bash
   pkg reinstall ffmpeg imagemagick
   ```

## Ferramenta de Correção Automática

O KnightBot-MD inclui uma ferramenta especial para corrigir problemas comuns no Termux. Execute:

```bash
./termux-fix.sh
```

Esta ferramenta pode corrigir automaticamente:
- Problemas de memória
- Dependências faltantes ou corrompidas
- Problemas de permissão
- Arquivos temporários que ocupam espaço

## Notas Importantes

- Mantenha o Termux aberto enquanto o bot estiver em execução
- Para manter o bot rodando mesmo quando o Termux estiver em segundo plano, use a opção 5 no `termux-start.sh` ou instale o pacote `tmux`
- Se o bot parar de responder, execute `./termux-fix.sh` e escolha a opção 5 para corrigir todos os problemas
- Em dispositivos com pouca memória, feche outros aplicativos antes de iniciar o bot

## Comandos Úteis

- Para parar o bot: Pressione `Ctrl + C` no terminal
- Para limpar a tela: `clear`
- Para verificar o uso de memória: `top`
- Para sair do Termux sem fechar o bot (se estiver usando tmux): `Ctrl + b` seguido de `d`
- Para verificar logs quando executando em segundo plano: `tail -f bot.log`
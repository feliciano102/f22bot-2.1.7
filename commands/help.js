const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const { channelInfo } = require('../lib/channelConfig');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ⚡ *${settings.botName || 'F22BOT'}* ⚡ 
┃ 
┃ 📱 *Versão:* ${settings.version || '2.0.5'}
┃ 👑 *Criador:* ${settings.botOwner || 'Mr Unique Hacker'}
┃ 🌐 *Grupo:* ${global.ytch}
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

*✨ COMANDOS DISPONÍVEIS ✨*

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🌐 *COMANDOS GERAIS*
┃ 
┃ ▸ .help | .menu
┃ ▸ .ping
┃ ▸ .alive
┃ ▸ .tts <texto>
┃ ▸ .owner
┃ ▸ .joke (piada)
┃ ▸ .quote (citação)
┃ ▸ .fact (fato)
┃ ▸ .weather <cidade> (clima)
┃ ▸ .news (notícias)
┃ ▸ .attp <texto>
┃ ▸ .lyrics <nome_música> (letras)
┃ ▸ .8ball <pergunta>
┃ ▸ .groupinfo (info do grupo)
┃ ▸ .staff | .admins 
┃ ▸ .vv
┃ ▸ .trt <texto> <idioma> (traduzir)
┃ ▸ .ss <link> (captura de tela)
┃ ▸ .jid
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👮‍♂️ *COMANDOS DE ADMIN*
┃ 
┃ ▸ .ban @usuário
┃ ▸ .promote @usuário (promover)
┃ ▸ .demote @usuário (rebaixar)
┃ ▸ .mute <minutos> (silenciar)
┃ ▸ .unmute (dessilenciar)
┃ ▸ .delete | .del (apagar)
┃ ▸ .kick @usuário (expulsar)
┃ ▸ .warnings @usuário (advertências)
┃ ▸ .warn @usuário (advertir)
┃ ▸ .antilink
┃ ▸ .antibadword (anti palavrão)
┃ ▸ .clear (limpar)
┃ ▸ .tag <mensagem> (marcar)
┃ ▸ .tagall (marcar todos)
┃ ▸ .chatbot
┃ ▸ .resetlink (redefinir link)
┃ ▸ .antitag <on/off>
┃ ▸ .welcome <on/off> (boas-vindas)
┃ ▸ .goodbye <on/off> (despedida)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🔒 *COMANDOS DO DONO*
┃ 
┃ ▸ .mode <public/private> (modo)
┃ ▸ .clearsession (limpar sessão)
┃ ▸ .antidelete
┃ ▸ .cleartmp (limpar temporários)
┃ ▸ .setpp <responder imagem> (definir foto)
┃ ▸ .autoreact <on/off>
┃ ▸ .autostatus <on/off>
┃ ▸ .autostatus react <on/off>
┃ ▸ .autotyping <on/off> (digitação automática)
┃ ▸ .autoread <on/off> (leitura automática)
┃ ▸ .anticall <on/off> (anti-chamada)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎨 *IMAGEM/STICKER*
┃ 
┃ ▸ .blur <imagem> (desfocar)
┃ ▸ .simage <responder sticker> (sticker para imagem)
┃ ▸ .sticker <responder imagem>
┃ ▸ .removebg (remover fundo)
┃ ▸ .remini
┃ ▸ .crop <responder imagem> (recortar)
┃ ▸ .tgsticker <Link>
┃ ▸ .meme
┃ ▸ .take <nome_pacote> 
┃ ▸ .emojimix <emj1>+<emj2>
┃ ▸ .igs <link instagram>
┃ ▸ .igsc <link instagram>
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🖼️ *COMANDOS DE FOTOS*
┃ 
┃ ▸ .pies <país>
┃ ▸ .china 
┃ ▸ .indonesia 
┃ ▸ .japan 
┃ ▸ .korea 
┃ ▸ .hijab
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎮 *JOGOS*
┃ 
┃ ▸ .tictactoe @usuário (jogo da velha)
┃ ▸ .hangman (forca)
┃ ▸ .guess <letra> (adivinhar)
┃ ▸ .trivia
┃ ▸ .answer <resposta>
┃ ▸ .truth (verdade)
┃ ▸ .dare (desafio)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 *COMANDOS DE IA*
┃ 
┃ ▸ .gpt <pergunta>
┃ ▸ .gemini <pergunta>
┃ ▸ .imagine <prompt>
┃ ▸ .flux <prompt>
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎯 *COMANDOS DIVERTIDOS*
┃ 
┃ ▸ .compliment @usuário (elogio)
┃ ▸ .insult @usuário (insulto)
┃ ▸ .flirt (paquerar)
┃ ▸ .shayari (poesia)
┃ ▸ .goodnight (boa noite)
┃ ▸ .roseday (dia da rosa)
┃ ▸ .character @usuário (personagem)
┃ ▸ .wasted @usuário
┃ ▸ .ship @usuário
┃ ▸ .simp @usuário
┃ ▸ .stupid @usuário [texto] (estúpido)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🔤 *CRIADOR DE TEXTO*
┃ 
┃ ▸ .metallic <texto>
┃ ▸ .ice <texto> (gelo)
┃ ▸ .snow <texto> (neve)
┃ ▸ .impressive <texto> (impressionante)
┃ ▸ .matrix <texto>
┃ ▸ .light <texto> (luz)
┃ ▸ .neon <texto>
┃ ▸ .devil <texto> (demônio)
┃ ▸ .purple <texto> (roxo)
┃ ▸ .thunder <texto> (trovão)
┃ ▸ .leaves <texto> (folhas)
┃ ▸ .1917 <texto>
┃ ▸ .arena <texto>
┃ ▸ .hacker <texto>
┃ ▸ .sand <texto> (areia)
┃ ▸ .blackpink <texto>
┃ ▸ .glitch <texto>
┃ ▸ .fire <texto> (fogo)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📥 *DOWNLOADS*
┃ 
┃ ▸ .play <nome_música> (tocar)
┃ ▸ .song <nome_música> (música)
┃ ▸ .instagram <link>
┃ ▸ .facebook <link>
┃ ▸ .tiktok <link>
┃ ▸ .video <nome música>
┃ ▸ .ytmp4 <Link>
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🧩 *DIVERSOS*
┃ 
┃ ▸ .heart (coração)
┃ ▸ .horny
┃ ▸ .circle (círculo)
┃ ▸ .lgbt
┃ ▸ .lolice
┃ ▸ .its-so-stupid (é tão estúpido)
┃ ▸ .namecard (cartão de nome)
┃ ▸ .oogway
┃ ▸ .tweet
┃ ▸ .ytcomment (comentário YT)
┃ ▸ .comrade (camarada)
┃ ▸ .gay 
┃ ▸ .glass (vidro)
┃ ▸ .jail (prisão)
┃ ▸ .passed (aprovado)
┃ ▸ .triggered (irritado)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🖼️ *ANIME*
┃ 
┃ ▸ .neko
┃ ▸ .waifu
┃ ▸ .loli
┃ ▸ .nom 
┃ ▸ .poke 
┃ ▸ .cry (chorar)
┃ ▸ .kiss (beijar)
┃ ▸ .pat (acariciar)
┃ ▸ .hug (abraçar)
┃ ▸ .wink (piscar)
┃ ▸ .facepalm (tapa na testa)
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

📢 *Entre em nosso canal para atualizações:*`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                ...channelInfo
            },{ quoted: message });
        } else {
            console.error('Imagem do bot não encontrada em:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                ...channelInfo
            });
        }
    } catch (error) {
        console.error('Erro no comando de ajuda:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;

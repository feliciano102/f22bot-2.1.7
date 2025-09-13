const { handleWelcome } = require('../lib/welcome');

async function welcomeCommand(sock, chatId, message, match) {
    // Verificar se é um grupo
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { text: 'Este comando só pode ser usado em grupos.' });
        return;
    }

    // Extrair correspondência da mensagem
    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    const matchText = text.split(' ').slice(1).join(' ');

    await handleWelcome(sock, chatId, message, matchText);
}

module.exports = welcomeCommand;

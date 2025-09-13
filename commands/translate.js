const fetch = require('node-fetch');

async function handleTranslateCommand(sock, chatId, message, match) {
    try {
        // Mostrar indicador de digitação
        await sock.presenceSubscribe(chatId);
        await sock.sendPresenceUpdate('composing', chatId);

        let textToTranslate = '';
        let lang = '';

        // Verificar se é uma resposta
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quotedMessage) {
            // Obter texto da mensagem citada
            textToTranslate = quotedMessage.conversation || 
                            quotedMessage.extendedTextMessage?.text || 
                            quotedMessage.imageMessage?.caption || 
                            quotedMessage.videoMessage?.caption || 
                            '';

            // Obter idioma do comando
            lang = match.trim();
        } else {
            // Analisar argumentos do comando para mensagem direta
            const args = match.trim().split(' ');
            if (args.length < 2) {
                return sock.sendMessage(chatId, {
                    text: `*TRADUTOR*\n\nUso:\n1. Responda a uma mensagem com: .translate <idioma> ou .trt <idioma>\n2. Ou digite: .translate <texto> <idioma> ou .trt <texto> <idioma>\n\nExemplo:\n.translate olá fr\n.trt olá fr\n\nCódigos de idioma:\nfr - Francês\nes - Espanhol\nde - Alemão\nit - Italiano\npt - Português\nru - Russo\nja - Japonês\nko - Coreano\nzh - Chinês\nar - Árabe\nhi - Hindi`,
                    quoted: message
                });
            }

            lang = args.pop(); // Obter código do idioma
            textToTranslate = args.join(' '); // Obter texto para traduzir
        }

        if (!textToTranslate) {
            return sock.sendMessage(chatId, {
                text: '❌ Nenhum texto encontrado para traduzir. Por favor, forneça um texto ou responda a uma mensagem.',
                quoted: message
            });
        }

        // Tentar várias APIs de tradução em sequência
        let translatedText = null;
        let error = null;

        // Tentar API 1 (Google Translate API)
        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
            if (response.ok) {
                const data = await response.json();
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                    translatedText = data[0][0][0];
                }
            }
        } catch (e) {
            error = e;
        }

        // Se a API 1 falhar, tentar API 2
        if (!translatedText) {
            try {
                const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${lang}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.responseData && data.responseData.translatedText) {
                        translatedText = data.responseData.translatedText;
                    }
                }
            } catch (e) {
                error = e;
            }
        }

        // Se a API 2 falhar, tentar API 3
        if (!translatedText) {
            try {
                const response = await fetch(`https://api.dreaded.site/api/translate?text=${encodeURIComponent(textToTranslate)}&lang=${lang}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.translated) {
                        translatedText = data.translated;
                    }
                }
            } catch (e) {
                error = e;
            }
        }

        if (!translatedText) {
            throw new Error('Todas as APIs de tradução falharam');
        }

        // Enviar tradução
        await sock.sendMessage(chatId, {
            text: `${translatedText}`,
        }, {
            quoted: message
        });

    } catch (error) {
        console.error('❌ Erro no comando de tradução:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Falha ao traduzir o texto. Por favor, tente novamente mais tarde.\n\nUso:\n1. Responda a uma mensagem com: .translate <idioma> ou .trt <idioma>\n2. Ou digite: .translate <texto> <idioma> ou .trt <texto> <idioma>',
            quoted: message
        });
    }
}

module.exports = {
    handleTranslateCommand
};
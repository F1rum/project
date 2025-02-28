// для работы скачиваем библиотеку гигачата (npm install gigachat)




// импортируем модуль для работы с HTTPS
const { Agent } = require('https');
// импортируем файловую систему для чтения файлов
const fs = require('fs');
// импортируем модуль гигачат для работы с API
const GigaChat = require('gigachat').default || require('gigachat');
require('dotenv').config();

// fs читает сертификаты из .env (сертификаты обычно используются для обеспечения безопасного соединения с сервером через протокол HTTPS)
const cert111 = fs.readFileSync(process.env.CERT_PATH_1);
const cert222 = fs.readFileSync(process.env.CERT_PATH_2);
const cert333 = fs.readFileSync(process.env.CERT_PATH_3);

// httpsxxx используется для настройки клиента чтобы он доверял только указанным сертификатам
const httpsAgent = new Agent({
    ca: [cert111,cert222,cert333],
    // включаем проверку сертификата
    rejectUnauthorized: true,
});

// функция для работы с гигачатом
async function askGigaChat(prompt) {
    try {
        const giga = new GigaChat({
            model: 'GigaChat-Max',
            credentials: process.env.GIGACHAT_API_KEY,
            httpsAgent,
        });
        // отправляем запрос к гигачату
        const response = await giga.chat({
            messages: [{ role: 'user', content: prompt }],
        });
        // возвращаем ответ от гигачата или сообщение об ошибке
        return response.choices[0]?.message.content || '⚠️ Ответ не получен';
        } catch (error) {
            console.error('Ошибка запроса в GigaChat:', error.response?.data || error.message);
            return '⚠️ Ошибка доступа к GigaChat';
        }
}

// экспортируем функцию в основу бота
module.exports = function command_ai_assistant(bot) {
    bot.hears('🤖 AI-ассистент', async (ctx) => {
        ctx.reply('🧠 Привет! Я AI-ассистент. Задавай вопросы, и я постараюсь помочь!');
    });
    
    bot.on('text', async (ctx) => {
        const usermessage = ctx.message.text;
        const response = await askGigaChat(usermessage);
        ctx.reply(response);
    });
};

// для работы скачиваем библиотеку гигачата (npm install gigachat)
// npm list gigachat (проверьте версию гигачата) - сейчас версия 0.0.12 (более новой версии пока что не существует в репозитории NPM)





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

// храним историю сообщений пользователей
const conversations = new Map();

// функция для работы с гигачатом
async function askGigaChat(userid, prompt) {
    // получаем историю сообщений пользователя из conversations (если нет - создаем пустой массив)
    let history = conversations.get(userid) || [];
    // добавляем новое сообщение пользователя в историю
    history.push({ role: 'user', content: prompt });

    const gigaChat = new GigaChat({
        model: 'GigaChat-Max',
        credentials: process.env.GIGACHAT_API_KEY,
        httpsAgent
    });
    // отправляем запрос к гигачат с историей сообщений
    const response = await gigaChat.chat({ messages: history });
    const reply = response.choices[0]?.message.content || '⚠️ Ошибка';
    // добавляем ответ гигачата в историю сообщений
    history.push({ role: 'assistant', content: reply });
    conversations.set(userid, history);
    
    return reply;
}

// экспортируем функцию в основу бота
module.exports = function command_ai_assistant(bot) {
    bot.hears('🤖 AI-ассистент', async (ctx) => {
        ctx.reply('🧠 Привет! Я AI-ассистент. Задавай вопросы, и я постараюсь помочь!');
    });
    
    bot.on('text', async (ctx) => {
        ctx.reply('💭 Думаю...');
        const userid = ctx.message.from.id;
        const usermessage = ctx.message.text;
        const response = await askGigaChat(userid,usermessage);
        ctx.reply(response);
    });
};

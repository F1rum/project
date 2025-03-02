// для работы скачиваем библиотеку гигачата (npm install gigachat)
// npm list gigachat (проверьте версию гигачата) - сейчас версия 0.0.12 (более новой версии пока что не существует в репозитории NPM)




const command_instruction = require('./command_instruction');
const command_functional = require('./command_functional');
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
// создание множества для хранения id пользователей с включенный ai ассистентом
const aiEnable=new Set();
// экспортируем функцию в основу бота
module.exports = function command_ai_assistant(bot) {
    bot.hears('🤖 AI-ассистент', async (ctx) => {
        const userid = ctx.message.from.id;
        // добавление пользователя в множество
        aiEnable.add(userid);
        ctx.reply('🧠 Привет! Я AI-ассистент. Задавай вопросы, и я постараюсь помочь!',{
            reply_markup: {
                keyboard: [
                    [{ text: "⬅️ Главное меню"}]
                ],
                resize_keyboard: true
            }
        });
    });
    
    bot.hears('⬅️ Главное меню', (ctx) => {
        const userid = ctx.message.from.id;
        // проверка есть ли пользователь в множестве
        if (aiEnable.has(userid)) {
            // удаление пользователя из множества если он там есть
            aiEnable.delete(userid);
        }
    
        ctx.reply('<b>✅ Вы вернулись в главное меню</b>', {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: [
                    [{ text: "📜 Функционал" }, { text: "📖 Инструкция" }],
                    [{ text: "🤖 AI-ассистент" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        });
    });
    // вызод функций из других файлов т к ай асситент продолжал работу после выхода в глвное меню 
    command_instruction(bot);
    
    command_functional(bot);

    bot.on('text', async (ctx) => {

        const userid = ctx.message.from.id;
        // если нет пользователя в множестве то выводиим сообщение и выходим 
        if (!aiEnable.has(userid)) {
            return ctx.reply('❌ AI-ассистент не активирован. Нажмите <b>🤖 AI-ассистент</b> в меню.', {
                parse_mode: "HTML"
            });
        }
    
        ctx.reply('<b>💭 Думаю...</b>', { parse_mode: "HTML" });
    
        const usermessage = ctx.message.text;
        const response = await askGigaChat(userid, usermessage);
        ctx.reply(response);
    });    
};

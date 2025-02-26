const { Telegraf } = require('telegraf'); 

module.exports = function command_instruction(bot) {
    // обработка кнопки инструкция 
    bot.hears('📖 Инструкция', (ctx) => {
        ctx.reply('<b>📖 Инструкция по использованию бота:</b> \n\n ℹ️ Выберите нужную страницу для просмотра.', {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: [
                    [{ text: "1️⃣ Первая страница" }, { text: "2️⃣ Вторая страница" }],
                    [{ text: "⬅️ Главное меню" }]
                ],
                resize_keyboard: true
            }
        });
    });

    // обработка первой страницы
    bot.hears('1️⃣ Первая страница', (ctx) => {
        ctx.replyWithPhoto('https://i.pinimg.com/736x/93/fe/a6/93fea6fdfccc59cec1898fcaac829ede.jpg',{
            // добавляем параметр caption для объединения фотографии и текста 
            caption: '<b>📖 Можете просмотреть страницу №1</b>',
            parse_mode: "HTML"
        });
    });

    // обработка второй страницы
    bot.hears('2️⃣ Вторая страница', (ctx) => {
        ctx.replyWithPhoto('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Deux.svg/640px-Deux.svg.png',{
            // добавляем параметр caption для объединения фотографии и текста 
            caption: '<b>📖 Можете просмотреть страницу №2</b>',
            parse_mode: "HTML"
        });
    });

    bot.hears('⬅️ Главное меню', (ctx) => {
        ctx.reply('<b>✅ Вы вернулись в главное меню </b>',{
            parse_mode: "HTML",
            reply_markup: {
                keyboard: [
                    [{ text: "🔍 Функционал" }, { text: "📖 Инструкция" }],
                    [{ text: "🤖 AI-ассистент" }]
                ],
                resize_keyboard: true, 
                one_time_keyboard: false 
            }
        });
    });
};
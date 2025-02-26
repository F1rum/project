require('dotenv').config();
const { Telegraf } = require('telegraf');
// импортируем модуль command_instruction и присваиваем его переменной
const command_instruction = require('./command_instruction');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);




bot.help((ctx)=>{
  ctx.reply('Если тебе нужна помощь, напиши мне <b>@nomercyforthemost</b>', { parse_mode: 'HTML' });
});

bot.start((ctx) =>{
  ctx.replyWithSticker('https://cdn2.combot.org/programmingsuicaplusplus/webp/16xf09f9396.webp');
  ctx.reply('Привет! 👋 Я — твой помощник по скидкам. Хочешь найти самые выгодные предложения в магазинах? Я помогу тебе найти лучшие скидки. 📉💸');
});




bot.command("menu", (ctx) => {
  ctx.reply('<b>✨ Выберите действие:</b>', {
    parse_mode:"HTML",
    reply_markup: {
      keyboard: [
        [{ text: "🔍 Функционал" }, { text: "📖 Инструкция" }],
        [{ text: "🤖 AI-ассистент" }]
      ],
      // делаем клавиатуру компактной
      resize_keyboard: true,
      // клавиатура остаётся после нажатия 
      one_time_keyboard: false 
    }
  });
});
// вызов функции из импортированного файла 
command_instruction(bot);




// обработка нажатия кнопку функционал 
bot.hears("🔍 Функционал", (ctx) => {
  ctx.reply("🔍 Тут можно узнать про функционал бота", {
    reply_markup: { remove_keyboard: true }
  });
});
// обработка нажатия кнопку аи ассистент 
bot.hears("🤖 AI-ассистент", (ctx) => {
  ctx.reply("🤖 AI-ассистент готов помочь!", {
    reply_markup: { remove_keyboard: true }
  });
});



// запускаем бота
bot.launch(); 
console.log('бот запущен');

// завершение процесса Ctrl + C в консоли
process.once('SIGINT', () => {
  console.log('бот останавливается...');
  // корректно останавливаем бота
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('бот останавливается...');
  // Корректно останавливаем бота
  bot.stop('SIGTERM');
});
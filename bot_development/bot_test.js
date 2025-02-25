require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.help((ctx)=>{
  ctx.reply('Если тебе нужна помощь, напиши мне <b>@nomercyforthemost</b>', { parse_mode: 'HTML' });
});

bot.start((ctx) =>{
  ctx.replyWithSticker('https://cdn2.combot.org/programmingsuicaplusplus/webp/16xf09f9396.webp');
  ctx.reply('Привет! 👋 Я — твой помощник по скидкам. Хочешь найти самые выгодные предложения в магазинах? Я помогу тебе найти лучшие скидки. 📉💸');
});

bot.command("menu", (ctx) => {
  ctx.reply('Выберите действие:', {
    reply_markup: {
      keyboard: [
        [{ text: "🔍 Функционал" }, { text: "📖 Инструкция" }],
        [{ text: "🤖 AI-ассистент" }]
      ],
      resize_keyboard: true, // делаем клавиатуру компактной
      one_time_keyboard: false // клавиатура остаётся после нажатия
    }
  });
});

// Обработка нажатий на кнопки
bot.hears("🔍 Функционал", (ctx) => {
  ctx.reply("🔍 Тут можно узнать про функционал бота", {
    reply_markup: { remove_keyboard: true }
  });
});

bot.hears("📖 Инструкция", (ctx) => {
  ctx.reply("📖 Вот инструкция по использованию...", {
    reply_markup: { remove_keyboard: true }
  });
});

bot.hears("🤖 AI-ассистент", (ctx) => {
  ctx.reply("🤖 AI-ассистент готов помочь!", {
    reply_markup: { remove_keyboard: true }
  });
});












bot.launch(); // запускаем бота
console.log('бот запущен');

// завершения процесса Ctrl + C в консоли
process.once('SIGINT', () => {
  console.log('бот останавливается...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('бот останавливается...');
  bot.stop('SIGTERM');
});
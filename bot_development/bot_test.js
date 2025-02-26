require('dotenv').config();
const { Telegraf } = require('telegraf');
// импортируем модуль command_instruction и присваиваем его переменной
const command_instruction = require('./command_instruction');
// импортируем модуль command_functional и присваеиваем его переменной 
const command_functional = require('./command_functional');
// модуль для работы с путями
const path = require('path');
// cоздаём бота беря токен из файла .env
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);




bot.help( (ctx) => {
  ctx.reply('Если тебе нужна помощь, напиши мне <b>@nomercyforthemost</b>', { parse_mode: 'HTML' });
});

bot.start( (ctx) => {
  // отправка фото из текущей директории
  ctx.replyWithPhoto({ source: path.join(__dirname, 'photo_start.jpg')},{
    caption: 'Привет! 👋 Устал натыкаться на бесполезные боты со скидками, где больше рекламы, чем реальной выгоды? Ты попал по адресу! Я найду для тебя только настоящие скидки в супермаркетах, без лишнего шума. Экономь время и деньги – просто выбирай, что нужно! 🛒💰'
  });
});




bot.command("menu", (ctx) => {
  ctx.reply('<b>✨ Выберите действие:</b>', {
    parse_mode:"HTML",
    reply_markup: {
      keyboard: [
        [{ text: "📜 Функционал" }, { text: "📖 Инструкция" }],
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

command_functional(bot);




// обработка кнопки аи ассистент 
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
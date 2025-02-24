require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello, World!');
});

process.on('SIGINT', () => {            // Остановка бота при завершении процесса при сочетании клавиш Ctrl+C
  bot.stopPolling();
  process.exit();
});
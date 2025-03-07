const puppeteer = require('puppeteer');

async function getFullHtml(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
  
    try {
      await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for network to be idle
      const fullHtml = await page.content();
      console.log(fullHtml); // Вывод всего HTML-кода в консоль
      return fullHtml; // Возвращаем HTML-код
    } catch (error) {
      console.error('Ошибка при получении HTML:', error);
      return null;
    } finally {
      await browser.close();
    }
  }

// Пример использования:
const urlToScrape = 'https://5ka.ru'; // Замените на нужный URL
getFullHtml(urlToScrape);
//node Parsing_OnJS.js
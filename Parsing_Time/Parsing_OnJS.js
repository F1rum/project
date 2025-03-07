const puppeteer = require('puppeteer');

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://5ka.ru/'); // Replace with the actual URL

    // Wait for content to load (adjust the selector and timeout as needed)
    await page.waitForSelector('.my-element', { timeout: 5000 });

    const data = await page.evaluate(() => {
        // Extract data using DOM selectors
        const title = document.querySelector('h1').innerText;
        const description = document.querySelector('.description').innerText;
        return { title, description };
    });

    console.log(data);
    await browser.close();
}

scrapeData();
//node Parsing_OnJS.js
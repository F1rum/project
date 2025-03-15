const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const targetUrl = 'https://f1rum.github.io/Gahan/';
const outputFilePath = 'poducts.json'; 

async function scrapeAndSave(url, outputFile) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await fs.writeFile(outputFilePath, '[]', 'utf8'); // Записываем пустой JSON-массив
        await page.goto(url, { waitUntil: 'networkidle2' });

        const cardData = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('#catalog .card'));
        
            if (cards.length > 0) {
                const cardDataArray = cards.map(card => { 
                    const imageElement = card.querySelector('.ItImg');
                    const cardImg = imageElement ? imageElement.src : null; // картинка
        
                    const nameElement = card.querySelector('.ItName');
                    const cardName = nameElement ? nameElement.textContent.trim() : null; // наименование
        
                    const oldPriceElement = card.querySelector('.ItOld');
                    const cardOldPrise = oldPriceElement ? oldPriceElement.textContent.trim() : null; // старая цена
                    const newPriceElement = card.querySelector('.ItNew');
                    const cardNewPrise = newPriceElement ? newPriceElement.textContent.trim() : null; //новая цена
        
                    return { 
                        store: "Гашан",
                        image: cardImg,
                        product: cardName,
                        oldPrice: cardOldPrise,
                        newPrice: cardNewPrise,
                    };
                });
                return cardDataArray; 
            } else {
                return [];
            }
        });

        const jsonData = JSON.stringify(cardData, null, 2);

        await fs.writeFile(outputFile, jsonData, 'utf8');
        console.log(`Data saved to ${outputFile}`);

    } catch (error) {
        console.error('Scraping failed:', error);
    } finally {
        await browser.close();
    }
}

scrapeAndSave(targetUrl, outputFilePath);
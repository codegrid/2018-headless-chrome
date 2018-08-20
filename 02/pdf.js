const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.pxgrid.com/');

  await page.pdf({
    path: './pdf/1.pdf',
    format: 'A4'
  });

  browser.close();
})();

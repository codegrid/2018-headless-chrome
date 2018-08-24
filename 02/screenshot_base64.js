const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.pxgrid.com/');

  const header = await page.$('.pxg3-header');
  const base64 = await header.screenshot({
    encoding: 'base64'
  });
  console.log(base64);

  browser.close();
})();

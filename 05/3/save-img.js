const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.co.jp/');

  const selector = '#hplogo';
  await page.waitForSelector(selector);
  const el = await page.$(selector);
  if(el){
    const prop = await el.getProperty('src');
    const url = await prop.jsonValue();
    const savePath = `./logo${path.extname(url)}`;

    // node-fetchで画像を取得
    const response = await fetch(url);
    const buffer = await response.buffer();
    await fs.writeFileSync(savePath, buffer);
  }
  browser.close();
})();

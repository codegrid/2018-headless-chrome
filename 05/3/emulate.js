const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  });
  const page = await browser.newPage();

  // デイバイス名を指定
  await page.emulate(devices['iPhone 6']);

  await page.goto('https://www.google.co.jp/');

  await page.screenshot({
    path: 'emulate.png',
    fullPage: true
  });
  await browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.co.jp/');

  // consoleイベントをlistenし、ログをターミナル上に出力する
  page.on('console', msg => {
    console.log(msg.text());
  });

  await page.evaluate(() => {
    console.log(location.href); // ターミナルに出力される
  });

  await browser.close();
})();

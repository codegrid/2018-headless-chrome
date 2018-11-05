/**
 * 次の書式でコマンドラインより実行することで、ベーシック認証によるアクセス制限のあるページのスクリーンショットを保存します。
 * node basic-authentication <url> <username> <password>
 */
const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  const username = process.argv[3];
  const password = process.argv[4];

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  });
  const page = await browser.newPage();

  const buf = new Buffer(`${username}:${password}`);
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${buf.toString('base64')}`
  });
  await page.goto(url);

  await page.screenshot({
    path: 'basic-authentication.png',
    fullPage: true
  });
  await browser.close();
})();

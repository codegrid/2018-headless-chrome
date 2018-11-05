/**
 * `createCDPSession()`によりDevTools Protocolセッションを生成し、
 * [`Page.setDownloadBehavior()`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDownloadBehavior)
 * にてダウンロードの許可と保存パスを設定しています。
 * また、上記コードのように`page.goto()`では動的にページを生成することが可能です。
 * ここでは生成したページ内にzipファイルのリンクを設け、これをクリックすることでダウンロード処理を開始させています。
 */
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: process.cwd()
  });

  // zipファイルのリンクを持つページを動的に生成
  const html = `
    <a href="https://github.com/codegrid/2018-headless-chrome/archive/master.zip">link</a>
  `;
  await page.goto(`data:text/html, ${html}`);
  await page.click('a');
  await browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
  // 非ヘッドレス状態でChromeを起動
  const browser = await puppeteer.launch({
    headless: false,
  });

  // ポート番号の確認
  console.log(browser.wsEndpoint());

  // タブを開く
  const page = await browser.newPage();

  // 指定サイトにアクセス
  await page.goto('https://app.codegrid.net/');

  // -------------------------------------------------
  // Pageインスタンスの持つAPIを使用し、UI操作を行う処理を書く
  // -------------------------------------------------

  // ブラウザを閉じる
  await browser.close();
})();

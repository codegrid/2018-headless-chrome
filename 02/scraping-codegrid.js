const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const username = process.argv[2];
  const password = process.argv[3];

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://app.codegrid.net/');

  // サインインリンクをクリック
  page.click('a[href^="/signin?redirect="]');
  await page.waitForNavigation();

  // Googleアカウント名を入力
  const idSelector = 'input[name=identifier]';
  await page.waitForSelector(idSelector);
  await page.type(idSelector, username);

  // 次へボタンをクリック
  await page.click('#identifierNext');
  await page.waitForNavigation();

  // パスワード入力フィールドが表示されるのを待つ
  const pwSelector = 'input[type=password]';
  await page.waitForSelector(pwSelector, {
    visible: true
  });

  // パスワードを入力
  await page.type(pwSelector, password);

  await page.click('#passwordNext');
  await page.waitForNavigation();

  /*
   * 二段階認証設定してる場合はここで二段階認証待ちになる
   */

  // CodeGridトップページに遷移してくるのを待つ
  await page.waitForFunction(() => {
    return location.href === 'https://app.codegrid.net/';
  }, {
    timeout: 1000 * 60 * 3
  });

  // お気に入りリストページへ移動
  await page.goto('https://app.codegrid.net/favorites');

  // お気に入りリストが表示されるのを待つ
  const titlesSelector = '.CG2-seriesList__itemTitleInner a';
  await page.waitForSelector(titlesSelector, {
    visible: true
  });

  // JSON形式に整形しファイルに出力
  const json = await page.$$eval(titlesSelector, items => {
    return items.map(item => {
      const url = item.href;
      const title = item.querySelector('span').textContent;
      return {
        title,
        url
      };
    });
  });
  fs.writeFile('./codegrid.json', JSON.stringify(json), (error) => {
    if (error) {
      throw error;
    }
    console.log('done');
  });
  console.log(json);

  await browser.close();
})();

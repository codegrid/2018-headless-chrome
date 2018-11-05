/**
 * 新しいページが生成される際に発火する`targetcreated`にて得られる`target`インスタンスより、
 * 新たに生成されたページインスタンスを得ています。
 * また、選択中のタブを切り替えるには次のように`page.bringToFront()`を使用します。
 */
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const html = `
    <a target="_blank" href="https://www.google.co.jp/">link</a>
  `;
  await page.goto(`data:text/html, ${html}`);
  await page.click('a');

  const newPage = await new Promise(resolve =>
    browser.once(
      'targetcreated',
      target => resolve(target.page())
    )
  );
  const title = await newPage.title();
  console.log(title); // Google

  await browser.close();
})();

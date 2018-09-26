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

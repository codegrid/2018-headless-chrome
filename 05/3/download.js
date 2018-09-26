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

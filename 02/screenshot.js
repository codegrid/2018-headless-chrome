const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.pxgrid.com/');

  await page.screenshot({
    path: './screenshot/1.png'
  });

  await page.screenshot({
    path: './screenshot/2.png',
    fullPage: true,
  });

  await page.screenshot({
    path: './screenshot/3.png',
    fullPage: true,
    omitBackground: true
  });

  await page.screenshot({
    path: './screenshot/4.png',
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 2000
    }
  });

  const header = await page.$('.pxg3-header');
  await header.screenshot({
    path: './screenshot/5.png',
  });

  const base64 = await header.screenshot({
    encoding: 'base64'
  });
  console.log(base64);

  browser.close();
})();

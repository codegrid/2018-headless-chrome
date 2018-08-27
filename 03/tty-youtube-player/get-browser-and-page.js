const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=400,450',
      '--window-position=1280,0',
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 400,
    height: 450
  });
  return {
    browser,
    page
  };
};
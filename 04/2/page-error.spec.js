const puppeteer = require('puppeteer');

jest.setTimeout(1000 * 60 * 3);

let browser;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 30
  });
});

afterAll(async () => {
  await browser.close();
});

const urls = [
  'user_register.html',
  'other.html'
];

describe('画面表示時エラーテスト', () => {
  urls.forEach(url => {
    test(url, async done => {
      const page = await browser.newPage();
      page.on('pageerror', err => {
        throw err;
      });
      page.on('error', err => {
        throw err;
      });
      await page.goto('http://localhost:8080/' + url);
      done();
    });
  });
});

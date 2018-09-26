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

it('画面表示時エラーテスト: user_register.html', async done => {
  const page = await browser.newPage();
  page.on('pageerror', err => {
    throw err;
  });
  page.on('error', err => {
    throw err;
  });

  const url = 'http://localhost:8080/user_register.html';
  const response = await page.goto(url);
  await expect(response).toBeTruthy();
  done();
});

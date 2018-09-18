const puppeteer = require('puppeteer');

jest.setTimeout(1000 * 60 * 3);

let browser, page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 30
  });
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/user_register.html');
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  await browser.close();
});

it('未入力エラーが表示される', async () => {
  await page.click('.goNextPage');
  await page.waitFor(100);
  const message = await page.$eval('.error', el => el.textContent);
  expect(message).toBe('ユーザ名が入力されてません。');
});

// let page;
beforeAll(async () => {
  // page = await global.__BROWSER__.newPage();
  await page.goto('http://localhost:8080/user_register.html');
});

// afterEach(async () => {
//   await page.close();
// });

it('未入力エラーが表示される', async () => {
  await page.waitFor(100);
  await page.click('.goNextPage');
  const message = await page.$eval('.error', el => el.textContent);
  expect(message).toBe('ユーザ名が入力されてません。');
});

// let page;
beforeAll(async () => {
  // page = await global.__BROWSER__.newPage();
  await page.goto('http://localhost:8080/user_register.html');
});

// afterEach(async () => {
//   await page.close();
// });

it('登録完了メッセージが表示される', async () => {
  await page.waitFor(100);
  await page.type('.user', 'yamada_taro');
  await page.type('.pass', 'password');
  await page.type('.pass_check', 'password');
  await page.click('.goNextPage');

  await page.waitFor(100);
  page.click('.goLastPage');

  await page.waitFor(100);
  const message = await page.$eval('.message', el => el.textContent);
  expect(message).toBe('登録が完了しました');
});

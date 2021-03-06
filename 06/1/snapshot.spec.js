beforeAll(async () => {
  await page.goto('http://localhost:8081/user_register.html');
});

test('初期表示画面', async () => {
  const image = await page.screenshot({
    fullPage: true
  });
  await expect(image).toMatchImageSnapshot();
});

test('エラー表示画面', async () => {
  await expect(page).toClick('.goNextPage');
  const image = await page.screenshot({
    fullPage: true
  });
  await expect(image).toMatchImageSnapshot();
});

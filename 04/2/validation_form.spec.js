beforeAll(async () => {
  await page.goto('http://localhost:8081/user_register.html');
});

it('未入力エラーが表示される', async () => {
  await expect(page).toClick('.goNextPage');
  const el = await expect(page).toMatchElement('.error');
  await expect(el).toMatch('ユーザ名が入力されてません。')
});

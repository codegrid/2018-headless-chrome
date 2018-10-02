beforeAll(async () => {
  // テスト用のポートを指定
  await page.goto('http://localhost:8081/user_register.html');
});

it('登録完了メッセージが表示される', async () => {
  // フォームに値を埋める
  await expect(page).toFillForm('form[name="register"]', {
    user: 'yamada_taro',
    pass: 'password',
    pass_check: 'password',
  });
  await expect(page).toClick('.goNextPage');
  await expect(page).toClick('.goLastPage');

  // 要素の取得
  const el = await expect(page).toMatchElement('.message');
  await expect(el).toMatch('登録が完了しました')
});

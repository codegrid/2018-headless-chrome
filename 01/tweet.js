const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

chromeLauncher.launch({
  chromeFlags: [
    '--disable-gpu'
  ]
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);

  CDP({
    port: chrome.port
  }, async protocol => {
    const {
      Page,
      Runtime,
    } = protocol;

    await Page.enable();
    await Runtime.enable();

    // user/passwordを設定
    const user = 'アカウント名を設定する';
    const pass = 'パスワードを設定する';

    // Twitterにログインする
    await Page.navigate({
      url: 'https://twitter.com/login'
    });
    await Page.loadEventFired();

    await Runtime.evaluate({
      expression: `
        document.querySelector('.js-username-field').value = '${user}';
        document.querySelector('.js-password-field').value = '${pass}';
        document.querySelector('.signin').submit();
      `
    });
    await Page.loadEventFired();

    // レンダリングを待つ
    await sleep(3000);

    // {[時間: number]: メッセージ}
    const greets = {
      8: 'おはようございます',
      12: 'こんにちわ',
      19: 'こんばんわ'
    };

    let lastHour;
    while (true) {

      // 1分間隔でつぶやく時間かをチェック
      await sleep(1000);
      const hour = (new Date()).getHours();
      console.log(hour, new Date());
      const greet = greets[hour];
      if (lastHour !== hour && greet) {
        lastHour = hour;

        // つぶやく
        const msg = `${hour}時になりました。${greet}`;
        await Runtime.evaluate({
          expression: `
              document.querySelector('#tweet-box-home-timeline').innerHTML = '<div>${msg}</div>'
              document.querySelector('.tweet-action').disabled = false;
              document.querySelector('.tweet-action').click();
          `
        });

        // つぶやいたら3秒おいてリロード
        await sleep(3000);
        await Page.navigate({
          url: 'https://twitter.com'
        });
        await Page.loadEventFired();
      }
    }

    async function sleep(time) {
      return new Promise(resolve => {
        setTimeout(async function () {
          resolve();
        }, time);
      });
    }

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });
});

const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
  startingUrl: 'http://localhost:8080/login.html',
  chromeFlags: [
    '--headless',
    '--disable-gpu'
  ]
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);

  const CDP = require('chrome-remote-interface');
  CDP({
    port: chrome.port
  }, async protocol => {
    const {
      Page,
      DOM,
      Runtime
    } = protocol;

    await Page.enable();
    await DOM.enable();
    await Runtime.enable();

    const script = (() => {
      console.log(location.href);
      document.addEventListener('DOMContentLoaded', async () => {
        const href = location.href;

        await sleep(1500);

        if (/login\.html/.test(href)) { // ログイン画面
          // ログイン処理は手動で行う

        } else if (/top\.html/.test(href)) { // TOP画面
          // 予約画面へ移動する
          location.href = '/reservation.html?item=foo';

        } else if (/reservation\.html/.test(href)) { // 予約画面
          // フォームを自動入力しsubmitする
          document.querySelector('input[name=color][value=blue]').checked = true;
          document.querySelector('input[name=quantity]').value = 15;
          document.forms[0].submit();

        } else if (/confirm\.html/.test(href)) { // 確認画面
          // submitする
          document.forms[0].submit();

        } else if (/result\.html/.test(href)) { // 処理結果画面
          const msg = document.querySelector('#result').innerHTML;

          if (/failure/.test(msg)) {
            // 予約失敗時は再度、予約画面へ
            location.href = '/reservation.html?item=foo';

          } else {
            console.log('予約成功？要画面確認！');
          }
        }

        async function sleep(time) {
          return new Promise(resolve => {
            setTimeout(async function () {
              resolve();
            }, time);
          });
        }


      });
    }).toString();

    await Page.addScriptToEvaluateOnLoad({
      scriptSource: `(${script})()`
    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });
});

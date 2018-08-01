const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
  chromeFlags: ['--headless', '--disable-gpu']
}).then(async chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);

  const CDP = require('chrome-remote-interface');
  await CDP({
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

    await Page.navigate({
      url: 'https://www.pxgrid.com/news/'
    });
    await Page.loadEventFired(); // ページのロード完了を待つ

    const script = (() => {
      return document.querySelector('#news').innerHTML; // 値を返す
    }).toString();

    const json = await Runtime.evaluate({
      expression: `(${script})()`
    });
    console.log(json);

    await protocol.close();
    await chrome.kill();
  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });
});

const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
  startingUrl: 'https://www.pxgrid.com/',
  chromeFlags: [
    '--headless',
    '--disable-gpu'
  ]
}).then(chrome => {

  // 自動割当されたポート番号を表示
  console.log(`Chrome debugging port running on ${chrome.port}`);
});

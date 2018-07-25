const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

chromeLauncher.launch({
  chromeFlags: [
    '--headless',
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
      DOM,
    } = protocol;

    await Page.enable();
    await Runtime.enable();
    await DOM.enable();

    await Page.navigate({
      url: 'https://www.pxgrid.com/news/'
    });
    await Page.loadEventFired();

    const doc = await DOM.getDocument();
    const news = await DOM.querySelector({
      nodeId: doc.root.nodeId,
      selector: '#news'
    });
    if (news.nodeId) {
      const json = await DOM.getOuterHTML({
        nodeId: news.nodeId
      });
      console.log(json);
    }

    protocol.close();
    chrome.kill();
  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });
});

const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');

const fetchWSEndpoint = () => {
  return new Promise(resolve => {
    http.get('http://localhost:9222/json', res => {
      res.setEncoding('utf8');
      res.on('data', data => {
        const json = JSON.parse(data);
        const {
          webSocketDebuggerUrl
        } = json[0];
        resolve(webSocketDebuggerUrl);
      });
    });
  });
};

(async () => {
  const browserWSEndpoint = await fetchWSEndpoint();
  const browser = await puppeteer.connect({
    browserWSEndpoint
  });
  const page = await browser.newPage();

  // お気に入りリストページへ移動
  await page.goto('https://app.codegrid.net/favorites');

  // お気に入りリストが表示されるのを待つ
  const titlesSelector = '.CG2-seriesList__itemTitleInner a';
  await page.waitForSelector(titlesSelector, {
    visible: true
  });

  // JSON形式に整形しファイルに出力
  const json = await page.$$eval(titlesSelector, items => {
    return items.map(item => {
      const url = item.href;
      const title = item.querySelector('span').textContent;
      return {
        title,
        url
      };
    });
  });
  fs.writeFile('./codegrid.json', JSON.stringify(json), (error) => {
    if (error) {
      throw error;
    }
    console.log('done');
  });
  console.log(json);
})();

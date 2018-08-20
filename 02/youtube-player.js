const puppeteer = require('puppeteer');
const readline = require('readline');

const getBrowserAndPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=400,450',
      '--window-position=1280,0',
    ]
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 400,
    height: 450
  });

  return {
    browser,
    page
  };
};

const play = async page => {
  const defaultQuery = 'results?search_query=music';
  const playFlags = {
    '-s': 'results?search_query=',
    '-v': 'watch?v='
  };
  const query = Object.keys(playFlags).reduce((output, key) => {
    const flagIdx = process.argv.findIndex(item => item === key);
    return flagIdx === -1 ? output : playFlags[key] + process.argv.slice(flagIdx + 1).join(' ');
  }, defaultQuery);

  await page.goto('https://www.youtube.com/' + query);

  // キーワード検索した場合は URL が results になる
  if (/^results/.test(query)) {
    const selector = 'a[href^="/watch?v="]';
    await page.waitForSelector(selector);
    await page.click(selector);
  }
};

const skipAd = async page => {
  await page.evaluate(() => {
    setInterval(() => {
      const skipBtn = document.querySelector('button.videoAdUiSkipButton');
      if (skipBtn) {
        skipBtn.click();
      }
      const ads = document.querySelector('.video-ads');
      if (ads && ads.style.display !== 'none') {
        ads.style.display = 'none';
      }
    }, 1000);
  });
};

const showTitle = async page => {
  let lastTitle;

  const getTitle = lastTitle => {
    const speak = (text) => {
      var uttr = new SpeechSynthesisUtterance(text);
      uttr.lang = 'en';
      speechSynthesis.speak(uttr);
    };

    const el = document.querySelector('h1.title');
    if (el && el.textContent !== lastTitle) {
      speak(el.textContent);
      return el.textContent;
    }
  };

  const watchTitle = async () => {
    const title = await page.evaluate(getTitle, lastTitle);
    if (title) {
      lastTitle = title;
      console.log(title);
    }
    setTimeout(watchTitle, 300);
  };
  await watchTitle();
};

const controlKeypress = (browser, page) => {
  process.stdin.on('keypress', async (str, key) => {
    // ctrl + c で終了
    if (key.sequence === '\u0003') {
      await browser.close();
      process.exit();
    }

    // YouTubeのショートカットキー
    if ([
      'n', // 次の曲
      'p', // 前の曲
      'j', // 巻き戻し
      'k', // 早送り
      'l' // 一時停止・再生
    ].includes(key.name)) {
      await page.keyboard.down('Shift');
      await page.keyboard.down(key.name);
    }
  });
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
};

(async () => {
  // ブラウザ、ページの取得
  const {
    browser,
    page
  } = await getBrowserAndPage();

  // 動画の再生
  await play(page);

  // 広告のスキップ
  await skipAd(page);

  // 動画タイトルの表示
  await showTitle(page);

  // ショートカットキーの制御
  controlKeypress(browser, page);
})();

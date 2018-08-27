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
  const baseUrl = 'https://www.youtube.com/';
  const searchQuery = 'search_query';
  const flagMap = {
    '-v': 'v',
    '-s': searchQuery,
    '-l': 'list'
  }
  const query = process.argv.reduce((output, chunk, index) => {
    const name = flagMap[chunk];
    if (!name) {
      return output;
    }
    const value = process.argv[index + 1];
    output.push([name, value].join('='));
    return output
  }, []).join('&');

  const re = new RegExp(searchQuery + '=');
  const isSearch = re.test(query);
  const endpoint = isSearch ? 'results' : 'watch';
  const url = [baseUrl + endpoint, query].join('?');
  await page.goto(url);

  // キーワード検索した場合は URL が results になる
  if (isSearch) {
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

const getBrowserAndPage = require('./get-browser-and-page');
const play = require('./play');
const PlayList = require('./playlist');
const PageWatcher = require('./page-watcher');
const KeyController = require('./key-controller');
const render = require('./render');
const speak = require('./speak');

(async () => {
  const {
    browser,
    page
  } = await getBrowserAndPage();

  await play(page);

  const playList = new PlayList();

  const pageWatcher = new PageWatcher(page, playList);
  pageWatcher.onChangeVideo(video => {
    render(playList);
    speak(page, video.title);
  });

  const keyController = new KeyController(browser, page, pageWatcher, playList);
  keyController.onChangeSelector(() => {
    render(playList);
  });
})();
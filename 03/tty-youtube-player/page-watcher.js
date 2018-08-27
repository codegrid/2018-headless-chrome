const Video = require('./video');

module.exports = class PageWatcher {
  constructor(page, playList) {
    this.redirectUrl = '';
    this._onChangeVideo = () => {};
    this.startWatch(page, playList);
  }

  onChangeVideo(cb) {
    this._onChangeVideo = cb;
  }

  requestRedirect(url) {
    this.redirectUrl = url;
  }

  finishedRedirect() {
    this.redirectUrl = '';
  }

  isFinishedRedirect() {
    return this.redirectUrl === '';
  }

  async execRedirect(page) {
    if (this.isFinishedRedirect()) {
      return;
    }
    await page.goto(this.redirectUrl);
    await page.waitForFunction(() => {
      return !!document.querySelector('h1.title');
    });
    this.finishedRedirect();
  }

  async getPageTitleAndUrl(page) {
    const el = await page.$('h1.title');
    if (!el) {
      return {
        isChangedPage: false
      };
    }
    const prop = await el.getProperty('textContent');
    const title = await prop.jsonValue();
    const url = await page.url();
    return {
      isChangedPage: !!title,
      title,
      url
    };
  }

  startWatch(page, playList) {
    const watch = async () => {
      await this._watch(page, playList);
      setTimeout(watch, 300);
    };
    watch();
  }

  async _watch(page, playList) {
    if (!this.isFinishedRedirect()) {
      await this.execRedirect(page);
      return;
    }
    await this._watchVideoChange(page, playList);
    await this._skipAd(page);
  }

  async _watchVideoChange(page, playList) {
    const {
      isChangedPage,
      title,
      url
    } = await this.getPageTitleAndUrl(page);
    if (!isChangedPage) {
      return;
    }
    const video = new Video(title, url);
    if (playList.hasSelectedVideo() && playList.getSelectedVideo().equal(video)) {
      return;
    }
    if (playList.selectedIndexIsLast()) {
      playList.addVideo(video);
      playList.nextCurrentIndex(true);
      this._onChangeVideo(video);
      return;
    }
    if (this.isFinishedRedirect()) {
      playList.nextCurrentIndex(true);
      const selectedVideo = playList.getSelectedVideo();
      if (selectedVideo.url !== url) {
        this.requestRedirect(selectedVideo.url);
      }
      this._onChangeVideo(selectedVideo);
    }
  }

  async _skipAd(page) {
    await page.evaluate(() => {
      const skipBtn = document.querySelector('button.videoAdUiSkipButton');
      if (skipBtn) {
        skipBtn.click();
      }
      const ads = document.querySelector('.video-ads');
      if (ads && ads.style.display !== 'none') {
        ads.style.display = 'none';
      }
    });
  }

};
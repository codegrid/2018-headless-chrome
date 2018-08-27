class PlayList {
  constructor() {
    this._list = [];
    this.currentIndex = undefined;
    this.selectedIndex = undefined;
  }

  addVideo(video) {
    this._list.push(video);
  }

  selectedIndexIsLast() {
    return this._list.length === 0 || this._list.length - 1 === this.selectedIndex;
  }

  hasSelectedVideo() {
    if (this._list.length === 0 || this.selectedIndex === undefined) {
      return false;
    }
    return true;
  }

  getSelectedVideo() {
    if (this.hasSelectedVideo()) {
      return this._list[this.selectedIndex];
    }
  }

  getVideos() {
    return this._list;
  }

  getVideo(url) {
    return this.list.find(video => video.url === url);
  }

  nextCurrentIndex(syncSelectedIndex) {
    (() => {
      if (this.currentIndex === undefined) {
        this.currentIndex = 0;
        return;
      }
      if (this.canChangingNextIndex()) {
        this.currentIndex++;
      }
    })();
    if (syncSelectedIndex) {
      this.syncSelectedIndex();
    }
  }

  canChangingNextIndex() {
    return this.currentIndex < this._list.length - 1;
  }

  prevCurrentIndex(syncSelectedIndex) {
    (() => {
      if (this.currentIndex === undefined) {
        this.currentIndex = 0;
        return;
      }
      if (this.currentIndex === 0) {
        return;
      }
      this.currentIndex--;
    })();
    if (syncSelectedIndex) {
      this.syncSelectedIndex();
    }
  }

  syncSelectedIndex() {
    this.selectedIndex = this.currentIndex;
  }
}
module.exports = PlayList;
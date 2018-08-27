class Video {
  constructor(title, url) {
    this.title = title;
    this.url = url;
  }

  equal(video) {
    return this.title === video.title;
  }
}
module.exports = Video;
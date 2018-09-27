## 第1回 Headlress Chromeの基本機能

- プログラムからHeadless Chromeを起動する
  - [01/run-headless.js](01/run-headless.js)
- Node.js側から要素を参照する
  - [01/get-from-outside.js](01/get-from-outside.js)
- ページにスクリプトを挿入し要素を参照する
  - [01/get-from-inside.js](01/get-from-inside.js)
- ページ読み込み時にスクリプトを実行する
  - [01/auto-reservation.js](01/auto-reservation.js)
- 自動でツイートする
  - [01/tweet.js](01/tweet.js)

### デモ用予約サイトの起動方法

「ページ読み込み時にスクリプトを実行する」で使用してる予約サイトは、以下手順で起動できます。

```
npm run reservation-app
```

## 第2回 Puppeteerの利用

- ポート番号を確認する
  - [02/puppeteer-base.js](02/puppeteer-base.js)
- 任意のスクリーンショットを撮る
  - [02/screenshot.js](02/screenshot.js)
  - [02/screenshot_base64.js](02/screenshot_base64.js)
- PDFを生成する
  - [02/pdf.js](02/pdf.js)

## 第3回 利用頻度の高いAPIの使い方と実装例

- スクレイピング
  - [03/scraping-codegrid.js](03/scraping-codegrid.js)
- スクレイピング(パスワード未指定版)
  - [03/scraping-codegrid-no-pw.js](03/scraping-codegrid-no-pw.js)
- 簡易YouTubeプレイヤー
  - [03/youtube-player.js](03/youtube-player.js)
- 簡易YouTubeプレイヤー(CUI付き)
  - [03/tty-youtube-player.js](03/tty-youtube-player.js)
- ターミナルからWeb Speech APIを使う
  - [03/tty-speech.js](03/tty-speech.js)








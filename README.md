## 第1回 Headlress Chromeの基本機能のデモ

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
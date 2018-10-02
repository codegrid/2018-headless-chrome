module.exports = {
  server: {
    command: `npx http-server -p 8081`,
    port: 8081
  },
  launch: process.env.CI === 'true' ? {
    // CI 環境の Chrome の path
    // executablePath: '/opt/google/chrome/chrome'
  } : {
    // 開発環境の Chrome の path
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

    // 非ヘッドレスモードは開発環境の場合のみ指定可
    headless: false
  }
};

module.exports = {
  server: {
    command: `npx http-server -p 8081`,
    port: 8081,
  },
  launch: process.env.CI === 'true' ?
    { args: ['--no-sandbox', '--disable-setuid-sandbox']} :
    { headless: false }
};

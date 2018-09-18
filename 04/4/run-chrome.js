const exec = require('child_process').exec;
exec('"/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome" --remote-debugging-port=9222', (err) => {
  if (err) {
    console.log(err);
  }
});

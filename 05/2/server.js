const exec = require('child_process').exec;
const port = process.env.PORT | 8081;
exec(`npx http-server -p ${port}`, err => {
  if (err) {
    console.log(err);
  }
});
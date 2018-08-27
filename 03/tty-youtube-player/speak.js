const speak = async (page, text) => {
  await page.evaluate(text => {
    var uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = 'en';
    speechSynthesis.speak(uttr);
  }, text);
};
module.exports = speak;
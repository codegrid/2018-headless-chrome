const baseUrl = 'https://www.youtube.com/';
const searchQuery = 'search_query';
const flagMap = {
  '-v': 'v',
  '-s': searchQuery,
  '-l': 'list'
};
const play = async page => {
  const query = process.argv.reduce((output, chunk, index) => {
    const name = flagMap[chunk];
    if (!name) {
      return output;
    }
    const value = process.argv[index + 1];
    output.push([name, value].join('='));
    return output;
  }, []).join('&');

  const re = new RegExp(searchQuery + '=');
  const isSearch = re.test(query);
  const endpoint = isSearch ? 'results' : 'watch';
  const url = [baseUrl + endpoint, query].join('?');
  await page.goto(url);

  // キーワード検索した場合は URL が results になる
  if (isSearch) {
    const selector = 'a[href^="/watch?v="]';
    await page.waitForSelector(selector);
    await page.click(selector);
  }
};
module.exports = play;
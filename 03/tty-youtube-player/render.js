const clearScreen = () => {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[0f');
};

const render = (playList) => {
  clearScreen();
  const viewText = playList.getVideos()
    .map((item, index) => {
      const current = index === playList.currentIndex ? '>' : ' ';
      const selected = index === playList.selectedIndex ? '◉ ' : '◯ ';
      return [current, selected, item.title].join('');
    })
    .join('\n');

  console.log(viewText);
};

module.exports = render;
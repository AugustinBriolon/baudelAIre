export default function writeAndDelete(text) {
  let index = 0;
  let direction = 1;

  const intervalId = setInterval(() => {
    process.stdout.write(text[index]);

    if (index === text.length - 1) {
      direction = -1;
    } else if (index === 0 && direction === -1) {
      clearInterval(intervalId);
      process.stdout.write('\n');
    }

    index += direction;
  }, 100);
}
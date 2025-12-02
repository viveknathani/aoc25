const fs = require('fs');

const fileData = fs.readFileSync('data/2.txt');

const inputRanges = fileData.toString().split(',');

function part1() {
  let result = 0;

  inputRanges.map(range => {
    const [first, last] = range.split('-').map(item => Number(item));
    for (let i = first; i <= last; ++i) {
      const str = String(i);
      if (str.length % 2 !== 0) {
        continue;
      }
      let firstHalf = str.substring(0, str.length / 2);
      let secondHalf = str.substring(str.length / 2, str.length);
      if (firstHalf === secondHalf) {
        result += i;
      }
    }
  });

  console.log(result);
}

function part2() {
  let result = 0;

  inputRanges.map(range => {
    const [first, last] = range.split('-').map(item => Number(item));
    for (let i = first; i <= last; ++i) {
      const str = String(i);
      const windowSize = Math.floor(str.length / 2);
      for (let currentWindow = 1; currentWindow <= windowSize; currentWindow++) {
        const toMatch = str.substring(0, currentWindow);
        const pattern = RegExp(`^(${toMatch}){2,}$`);
        if (pattern.test(str)) {
          result += i;
          break;
        }
        if (str.length % 2 === 1) {
          currentWindow++;
        }
      }
    }
  });

  console.log(result);
}

part2();

const fs = require('fs');

const fileData = fs.readFileSync('data/3.txt');

const lines = fileData.toString().split('\n');

function part1() {
  let result = 0;

  lines.map(line => {
    let maxValue = 0;
    for (let i = 0; i < line.length; ++i) {
      let firstNum = parseInt(line[i]);
      for (let j = i + 1; j < line.length; ++j) {
        let secondNum = parseInt(line[j]);
        maxValue = Math.max(maxValue, firstNum * 10 + secondNum);
      }
    }
    result += maxValue;
  });

  console.log(result);
}

function best12(line) {
  const k = 12;
  const n = line.length;

  let needed = k;
  let result = [];
  let i = 0;

  while (needed > 0) {
    let maxIndex = n - needed;
    let bestDigit = '0';
    let bestPos = i;

    for (let p = i; p <= maxIndex; p++) {
      if (line[p] > bestDigit) {
        bestDigit = line[p];
        bestPos = p;
        if (bestDigit === '9') break;
      }
    }

    result.push(bestDigit);
    needed--;
    i = bestPos + 1;
  }

  return result.join('');
}

function part2() {
  let total = 0n;

  for (const line of lines) {
    const best = best12(line);
    total += BigInt(best);
  }

  console.log(total.toString());
}

part2();

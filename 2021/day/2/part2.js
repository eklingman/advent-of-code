const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part2.js <input file>');
    process.exit(1)
}

const directions = fs.readFileSync(process.argv[2]).toString().split("\n");

let horizontalPosition = 0, depth = 0, aim = 0;
directions.forEach(d => {
    const [cmd, num] = d.split(' ');
    switch (cmd) {
        case 'forward':
            horizontalPosition += Number(num);
            depth += aim * Number(num);
            break;
        case 'down':
            aim += Number(num);
            break;
        case 'up':
            aim -= Number(num);
            break;
    }
});
console.log(`Final Position: ${horizontalPosition * depth}`);

process.exit(0);

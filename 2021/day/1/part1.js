const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part1.js <input file>');
    process.exit(1)
}

const depthMeasurements = fs.readFileSync(process.argv[2]).toString().split("\n");
console.log(depthMeasurements);
console.log(`There are ${depthMeasurements.length} depth measurements to process`);

let prev = null, numIncreased = 0;
depthMeasurements.forEach((m, i) => {
    if (i != 0 && Number(m) > Number(prev)) {
        numIncreased += 1;
    }
    prev = m;
});
console.log(`Depth measurements increased ${numIncreased} time(s)`);

process.exit(0);

const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part2.js <input file>');
    process.exit(1)
}

const depthMeasurements = fs.readFileSync(process.argv[2]).toString().split("\n");
console.log(depthMeasurements);

let prevTotal = null, currTotal = 0, numIncreased = 0;
depthMeasurements.forEach((m, i) => {
    let second = depthMeasurements[i+1], third = depthMeasurements[i+2];

    if (second && third) {
        currTotal = Number(m) + Number(second) + Number(third);

        if (prevTotal) {
            if (currTotal > prevTotal) {
                numIncreased += 1;
            }
        }

        prevTotal = currTotal;
    }
});
console.log(`Three-measurement windows increased ${numIncreased} time(s)`);

process.exit(0);

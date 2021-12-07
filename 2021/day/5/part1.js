const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part1.js <input file>');
    process.exit(1)
}

// Extract each line of the input file into an array //
const ventLines = fs.readFileSync(process.argv[2]).toString().split("\n");

// Get max x/y coordinates //
let xMax = 0, yMax = 0;
ventLines.forEach(vl => {
    if (vl == '') {
        return;
    }

    const [start, end] = vl.split(' -> ');
    const [x1, y1] = start.split(',').map(n => Number(n));
    const [x2, y2] = end.split(',').map(n => Number(n));

    if (x1 > xMax) xMax = x1;
    if (x2 > xMax) xMax = x2;
    if (y1 > yMax) yMax = y1;
    if (y2 > yMax) yMax = y2;
});

// Generate a vent map with vent lines //
let dangerPoints = 0;
let ventMap = {}
ventLines.forEach(vl => {
    if (vl == '') {
        return;
    }

    const [start, end] = vl.split(' -> ');
    const [x1, y1] = start.split(',').map(n => Number(n));
    const [x2, y2] = end.split(',').map(n => Number(n));

    let x = Math.min(x1, x2), xEnd = Math.max(x1, x2);
    let y = Math.min(y1, y2), yEnd = Math.max(y1, y2);

    if (x1 == x2 || y1 == y2) {
        for (let i = x; i <= xEnd; i++) {
            for (let j = y; j <= yEnd; j++) {
                const key = `${i}:${j}`;
                ventMap[key] = (ventMap[key]) ? ventMap[key] + 1 : 1;
            }
        }
    }
});

Object.keys(ventMap).forEach(k => {
    if (ventMap[k] > 1) {
        dangerPoints += 1;
    }
});

console.log(dangerPoints);

process.exit(0);

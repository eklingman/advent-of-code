const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part2.js <input file>');
    process.exit(1)
}

// Extract each line of the input file into an array //
const diagnosticNumbers = fs.readFileSync(process.argv[2]).toString().split("\n");

let positionsArray = [],
    o2GeneratorRating = 0,
    co2ScrubberRating = 0,
    o2NumbersArray = [...diagnosticNumbers],
    co2NumbersArray = [...diagnosticNumbers];

// Go bit by bit filtering to get O2 and CO2 values //
for (let i = 0; i < diagnosticNumbers[0].length; i++) {
    // Need separate counts for O2 and CO2 //
    positionsArray[i] = { 'o2': {'1': 0, '0': 0}, 'co2': {'1': 0, '0': 0} };

    // First time through this is the entire list //
    o2NumbersArray.forEach(d => {
        positionsArray[i]['o2'][d[i]] += 1;
    });

    // Then we filter it based on the bit criteria, so subsequent lists are smaller //
    if (o2NumbersArray.length > 1) {
        o2NumbersArray = (positionsArray[i]['o2']['0'] > positionsArray[i]['o2']['1']) ?
            o2NumbersArray.filter(num => num[i] == '0') :
            o2NumbersArray.filter(num => num[i] == '1');
    }

    // Have to do it separately for CO2 (probably a better way to do this) //
    co2NumbersArray.forEach(d => {
        positionsArray[i]['co2'][d[i]] += 1;
    });
    if (co2NumbersArray.length > 1) {
        co2NumbersArray = (positionsArray[i]['co2']['0'] > positionsArray[i]['co2']['1']) ?
            co2NumbersArray.filter(num => num[i] == '1') :
            co2NumbersArray.filter(num => num[i] == '0');
    }

    // If we've got final values for each, no reason to keep going //
    if (o2NumbersArray.length == 1 && co2NumbersArray.length == 1) {
        break;
    }
}

// Convert strings of binary digits to integers //
o2GeneratorRating = parseInt(o2NumbersArray[0], 2);
co2ScrubberRating = parseInt(co2NumbersArray[0], 2);

console.log(
    `O2 Generator Rating = ${o2GeneratorRating}, ` +
    `CO2 Scrubber Rating = ${co2ScrubberRating}, ` +
    `Life Support Rating = ${o2GeneratorRating * co2ScrubberRating}`
);

process.exit(0);

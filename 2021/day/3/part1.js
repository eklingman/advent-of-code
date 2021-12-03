const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node part1.js <input file>');
    process.exit(1)
}

// Extract each line of the input file into an array //
const diagnosticNumbers = fs.readFileSync(process.argv[2]).toString().split("\n");

let positionsArray = [],
    binaryRates = { gamma: '', epsilon: '' },
    gamma = 0,
    epsilon = 0;

// Each item is a binary number string like "10010010" //
diagnosticNumbers.forEach((d, i) => {
    // Increment the counts of 0 and 1 at each position //
    d.split('').forEach((num, j) => {
        // Need to initialize an object at each position //
        if (i == 0) {
            positionsArray[j] = {'1': 0, '0': 0};
        }

        positionsArray[j][num] += 1;
    });
});
console.log(positionsArray);

// Gamma binary generated from most common bit at each position, epsilon the opposite //
positionsArray.forEach(p => {
    if (p['0'] > p['1']) {
        binaryRates.gamma += '0';
        binaryRates.epsilon += '1';
    } else {
        binaryRates.gamma += '1';
        binaryRates.epsilon += '0';
    }
});
console.log(binaryRates);

// Convert strings of binary digits to integers //
gamma = parseInt(binaryRates.gamma, 2);
epsilon = parseInt(binaryRates.epsilon, 2);

console.log(`Gamma Rate = ${gamma}, Epsilon Rate = ${epsilon}, Power Consumption = ${gamma * epsilon}`);

process.exit(0);

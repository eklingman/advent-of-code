const fs = require('fs');

if (process.argv.length != 3) {
    console.log('USAGE:');
    console.log('node index.js <input file>');
    process.exit(1)
}

const bingoInput = fs.readFileSync(process.argv[2]).toString().split("\n");

let drawOrder = [], boards = [], findFirstWinner = false;

// Store boards and draw order //
bingoInput.forEach((line, i) => {
    // First line is always draw order //
    if (i == 0) {
        drawOrder = line.split(',');
        return;
    }

    // Don't need the last line, thanks //
    if (i+1 == bingoInput.length) {
        return;
    }

    // If a blank line, we know the next one starts a board //
    if (line == '') {
        boards.push([]);
        return;
    } else {
        boards[boards.length-1].push(line.trim().split(/\s+/).map(l => {
            return { num: Number(l), marked: false };
        }));
    }
});

// Draw numbers, mark boards //
let winners = [];
for (let i = 0; i < drawOrder.length; i++) {

    // Draw one number at a time //
    const current = drawOrder[i];

    // Do each board one at a time, mark the current num //
    boards.forEach(board => {
        // Find index of num in row, mark it //
        board.forEach(row => {
            row.forEach(elem => {
                if (Number(elem.num) == Number(current)) {
                    elem.marked = true;
                }
            });
        });
    });

    boards.forEach((board, b) => {
        let winner = null, sumUnmarked = 0, score = 0;

        // See if any winners after each draw //
        for (let j = 0; j < board.length; j++) {
            let row = board[j], col = board.map(r => r[j]);

            row = row.filter(elem => elem.marked);
            col = col.filter(elem => elem.marked);

            if (row.length == 5) {
                winner = row;
                break;
            } else if (col.length == 5) {
                winner = col;
                break;
            }
        }

        // If we have a winner, do the final calculation //
        if (winner !== null) {
            board.forEach(row => {
                row.forEach(elem => {
                    if (!elem.marked) {
                        sumUnmarked += elem.num;
                    }
                });
            });
            score = sumUnmarked * Number(current);
            winners.push({
                winningBoard: board,
                winningRowOrCol: JSON.stringify(winner),
                sumUnmarked: sumUnmarked,
                winningNumber: Number(current),
                finalScore: score,
            });
            boards.splice(b, 1);
        }
    });
}
console.log(winners[0]);
console.log(winners[winners.length-1]);

process.exit(0);

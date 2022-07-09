//function to create n squares
export function range(start: number, end: number) {
    return Array(end - start)
        .fill(null)
        .map((_, i) => i + start);
}

//function to find best next move for computer to win
export function bestMove(board: any, winningLines: any[][]) {
    let bestScore = -Infinity;
    let move;
    for (let idx = 0; idx < board.length; idx++) {
        if (board[idx] == "") {
            board[idx] = "X";
            let score = minimax(board, 0, false, winningLines);
            board[idx] = "";
            if (score > bestScore) {
                bestScore = score;
                move = idx;
            }
        }
    }
    return move;
}

let scores: Record<string, number> = {
    "X": 1,
    "O": -1,
    "": 0,
};
export function minimax(board: any[], depth: number, isMaximizing: boolean, winningLines: any[][]) {
    let res = checkWinner(board, winningLines);
    if (res !== null) {
        return scores[res];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let idx = 0; idx < board.length; idx++) {
            if (board[idx] == "") {
                board[idx] = "X";
                let score = minimax(board, depth + 1, false, winningLines);
                board[idx] = "";
                bestScore = Math.max(score, bestScore)
            }
        }
        return bestScore;
    }
    else {
        let bestScore = -Infinity;
        for (let idx = 0; idx < board.length; idx++) {
            if (board[idx] == "") {
                board[idx] = "O";
                let score = minimax(board, depth + 1, true, winningLines);
                board[idx] = "";
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore;
    }
}

//function to check winner if any
export function checkWinner(board: any[], winningLines: any[][]) {
    let res = "";
    var xWon = true;
    for (let line of winningLines) {
        var xWon = true;
        var oWon = true;
        for (let index of line) {
            if (board[index] == "X") {
                continue;
            }
            else {
                xWon = false;
                break;
            }
        }
        for (let index of line) {
            if (board[index] == "O") {
                continue;
            }
            else {
                oWon = false;
                break;
            }
        }

        if (xWon) { res = "X" }
        if (oWon) { res = "O" }
    }
    return res
}

export function generateWinningLines(input: number) {
    const array = new Array(input * input).fill(0).map((_, i) => i)
    let res: any[][];
    let horizontalWin = [];
    let verticalWin = [];
    let diagonalWin45 = [];
    let diagonalWin135 = [];
    
    for (let i = 0; i < input * input; i += input) {
        let lineRow = array.slice(i, i + input)
        horizontalWin.push(lineRow)
    }

    for (let i = 0; i < input; i += 1) {
        var lineCol = []
        for (let j = i; j < input * input; j += input) {
            lineCol.push(j)
        }
        verticalWin.push(lineCol)

        var lineDiag45 = []
        if (i == 0) {
            for (let k = i; k < input * input; k += (input + 1)) {
                lineDiag45.push(k)
            }
            diagonalWin45.push(lineDiag45)
        }

        var lineDiag135 = []
        if (i == input - 1) {
            for (let k = i; k <= input * (input - 1); k += i) {
                lineDiag135.push(k)
            }
            diagonalWin135.push(lineDiag135)
        }
    }

    res = [...horizontalWin, ...verticalWin, ...diagonalWin45, ...diagonalWin135]
    return [res, horizontalWin, verticalWin, diagonalWin45, diagonalWin135];
}

export function containWin(array2d: number[][], winningLine: number[]) {
    let result = array2d.filter((item) => {
        if (item.length === winningLine.length) {
            for (var i = 0; i < item.length; i++) {
                if (item[i] !== winningLine[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    });
    return result.length > 0;
}
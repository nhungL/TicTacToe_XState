import { generateWinningLines } from "../machines/ticTacToeMachine";


//function to create n squares
export function range(start: number, end: number) {
    return Array(end - start)
        .fill(null)
        .map((_, i) => i + start);
}

export function bestMove(current: any) {
    let bestScore = -Infinity;
    let move;
    let board = current.context.board;
    for (let idx = 0; idx < board.length; idx++) {
        if (board[idx] == "") {
            board[idx] = "X";
            let score = minimax(current.context.board, 0, false);
            board[idx] = "";
            if (score > bestScore) {
                bestScore = score;
                move = idx;
            }
        }
    }
    return move;
}

export function checkWinner(board: any[]) {
    let res = "";
    let winningLines = generateWinningLines(Math.sqrt(board.length))
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
let scores: Record<string, number> = {
    "X": 1,
    "O": -1,
    "": 0,
};

export function minimax(board: any[], depth: number, isMaximizing: boolean) {
    let res = checkWinner(board);
    console.log({ res })
    if (res !== null) {
        return scores[res];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let idx = 0; idx < board.length; idx++) {
            if (board[idx] == "") {
                board[idx] = "X";
                let score = minimax(board, depth + 1, false);
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
                let score = minimax(board, depth + 1, true);
                board[idx] = "";
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore;
    }
}
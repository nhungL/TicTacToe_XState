import { allPossibleWin } from "./3x3";
import { checkWinner } from "./mainFunctions";

interface Minimax5 {
    move: number | undefined;
    bestScore: number;
}

export const asyncCallWithTimeout = async (asyncPromise: any, timeLimit: number) => {
    let timeoutHandle: any;

    const timeoutPromise = new Promise((_resolve, reject) => {
        timeoutHandle = setTimeout(
            () => reject(new Error('Async call timeout limit reached')),
            timeLimit
        );
    });

    return Promise.race([asyncPromise, timeoutPromise]).then(result => {
        clearTimeout(timeoutHandle);
        return result;
    })
}

export function minimax5(board: any[],
    player_id: string,
    depth: number,
    maximize: boolean,
    alpha = -Infinity,
    beta = -Infinity): Promise<Minimax5> {
    var findBestMove = setInterval(async () => {
        let scores: Record<string, number> = {
            X: 10 + depth,
            O: -10 - depth,
            tie: 0,
        };
        var winner = checkWinner(board).winner;
        if (winner != null) {
            return { move: undefined, bestScore: scores[winner] };
        }
        else {
            var move = undefined;
            var value = null;
            var bestScore = null;

            console.log("inside minimax5")
            for (let i = 0; i < 25; i++) {
                if (board[i] == "") {
                    board[i] = player_id
                    var res = await minimax5(board, 'X' ? 'O' : 'X', depth - 1, false, alpha, beta);
                    value = res.bestScore;
                    board[i] = ""
                    if (value != null) {
                        if (maximize) alpha = Math.max(alpha, value);
                        else beta = Math.min(beta, value)

                        if (maximize && alpha != -Infinity && beta != Infinity && alpha >= beta) break
                        if (!maximize && alpha != -Infinity && beta != Infinity && beta >= alpha) break
                        move = i
                    }
                }
            }
            if (maximize) {
                bestScore = alpha
                return { move, bestScore };
            }
            bestScore = beta;
            return { move, bestScore };
        }
    }, 500);
}

export function checkWinner5x5(board: any[], size: number) {
    let winner = null, winningLine: number[] = [];
    const available = [];
    var vertical = [0, 1, 5, 6, 10, 11, 15, 16, 20, 21]
    for (let i of vertical) {
        if (board[i] !== "" && (board[i] === board[i + 1] === board[i + 2] === board[i + 3])) {
            // console.log("in vertical")
            winner = board[i];
            while (winningLine.length != 4) {
                winningLine.push(i);
                i += 1;
            }
        }
    }

    var l_diagonal = [0, 1, 5, 6]
    for (let i of l_diagonal) {
        if (board[i] !== "" && board[i] === board[i + 5 + 1] === board[i + 10 + 2] === board[i + 15 + 3]) {
            // console.log("in l_diagonal")
            winner = board[i];
            while (winningLine.length != 4) {
                winningLine.push(i);
                i += 6;
            }
        }
    }

    var r_diagonal = [3, 4, 8, 9]
    for (let i of r_diagonal) {
        if (board[i] !== "" && board[i] === board[i + 5 - 1] === board[i + 10 - 2] === board[i + 15 - 3]) {
            // console.log("in r_diagonal")
            winner = board[i];
            while (winningLine.length != 4) {
                winningLine.push(i);
                i += 4;
            }
        }
    }

    for (let i = 0; i < 10; i++) {
        var temp_idx = i;
        if (board[i] !== "" && board[i] === board[i + 5] === board[i + 10] === board[i + 15]) {
            // console.log("in horizontal")
            winner = board[i];
            while (winningLine.length != 4) {
                winningLine.push(i);
                i += 5;
            }
        }
        i = temp_idx
    }

    for (let j = 0; j < 25; j++) {
        if (board[j] === "")
            available.push([j]);
    }

    if (winner == null && available.length == 0) {
        winner = 'tie';
    }
    return { winner, winningLine }
}

export function allPossibleWin5x5() {
    const array = new Array(25).fill(0).map((_, i) => i)
    let res: any[][];
    let horizontalWin = [];
    let verticalWin = [];
    let diagonalWin45 = [];
    let diagonalWin135 = [];

    var vertical = [0, 1, 5, 6, 10, 11, 15, 16, 20, 21]
    for (let i of vertical) {
        var lineCol = [];
        while (lineCol.length != 4) {
            lineCol.push(i);
            i += 1;
        }
        verticalWin.push(lineCol)
    }

    var l_diagonal = [0, 1, 5, 6]
    for (let i of l_diagonal) {
        var lineDiag45 = []
        while (lineDiag45.length != 4) {
            lineDiag45.push(i);
            i += 6;
        }
        diagonalWin45.push(lineDiag45);
    }

    var r_diagonal = [3, 4, 8, 9]
    for (let i of r_diagonal) {
        var lineDiag45 = []
        while (lineDiag45.length != 4) {
            lineDiag45.push(i);
            i += 4;
        }
        diagonalWin135.push(lineDiag45);
    }

    for (let i = 0; i < 10; i++) {
        var temp_idx = i;
        var lineRow = []
        while (lineRow.length < 4) {
            lineRow.push(i);
            i += 5;
        }
        horizontalWin.push(lineRow);
        i = temp_idx;
    }

    res = [...horizontalWin, ...verticalWin, ...diagonalWin45, ...diagonalWin135]
    return [res, horizontalWin, verticalWin, diagonalWin45, diagonalWin135];
}
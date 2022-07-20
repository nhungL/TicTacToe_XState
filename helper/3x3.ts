import { checkWinner } from "./mainFunctions";

export function minimax3(board_2d: any[][], depth: number, isMaximizing: boolean) {
    let scores: Record<string, number> = {
        X: 10 + depth,
        O: -10 - depth,
        tie: 0,
    };
    var res: number;
    const board = ([] as any[]).concat(...board_2d);
    var winner = checkWinner(board).winner;
    if (winner != null) {
        return scores[winner];
    }

    var res: number;
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board_2d.length; i++) {
            for (let j = 0; j < board_2d.length; j++) {
                if (board_2d[i][j] == "") {
                    board_2d[i][j] = "X";
                    let score = minimax3(board_2d, depth + 1, false);
                    board_2d[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        res = bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < board_2d.length; i++) {
            for (let j = 0; j < board_2d.length; j++) {
                if (board_2d[i][j] == "") {
                    board_2d[i][j] = "O";
                    let score = minimax3(board_2d, depth + 1, true);
                    board_2d[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        res = bestScore;
    }
    return res;
}

function equals3(a: string, b: string, c: string) {
    return (a == b && b == c && a != "");
}

export function checkWinner3x3(board: any[], size: number) {
    let winner = null, winningLine: number[] = [];
    const available = [];
    const board_2d = [];

    for (let i = 0; i < board.length; i += size) {
        board_2d.push(board.slice(i, i + size));
    }

    // horizontal
    for (let i = 0; i < size; i++) {
        if (equals3(board_2d[i][0], board_2d[i][1], board_2d[i][2])) {
            winner = board_2d[i][0];
            for (let j = 0; j < size; j++) {
                winningLine.push(i * board_2d.length + j)
            }
        }
    }

    // Vertical
    for (let i = 0; i < size; i++) {
        if (equals3(board_2d[0][i], board_2d[1][i], board_2d[2][i])) {
            winner = board_2d[0][i];
            for (let j = 0; j < size; j++) {
                winningLine.push(j * board_2d.length + i)
            }
        }
    }

    // Diagonal
    if (equals3(board_2d[0][0], board_2d[1][1], board_2d[2][2])) {
        winner = board_2d[0][0];
        for (let j = 0; j < size; j++) {
            winningLine = [0, 4, 8];
        }
    }
    if (equals3(board_2d[2][0], board_2d[1][1], board_2d[0][2])) {
        winner = board_2d[2][0];
        for (let j = 0; j < size; j++) {
            winningLine = [2, 4, 6];
        }
    }

    for (let j = 0; j < 9; j++) {
        if (board[j] == "")
            available.push([j]);
    }

    if (winner == null && available.length == 0) {
        winner = 'tie';
    }
    return { winner, winningLine }
}

export function allPossibleWin3x3() {
    const array = new Array(9).fill(0).map((_, i) => i)
    let res: any[][];
    let horizontalWin = [];
    let verticalWin = [];
    let diagonalWin45 = [];
    let diagonalWin135 = [];
    for (let i = 0; i < 9; i += 3) {
        let lineRow = array.slice(i, i + 3)
        verticalWin.push(lineRow)
    }

    for (let i = 0; i < 3; i += 1) {
        var lineCol = []
        for (let j = i; j < 9; j += 3) {
            lineCol.push(j)
        }
        horizontalWin.push(lineCol)

        var lineDiag45 = []
        if (i == 0) {
            for (let k = i; k < 9; k += (3 + 1)) {
                lineDiag45.push(k)
            }
            diagonalWin45.push(lineDiag45)
        }

        var lineDiag135 = []
        if (i == 3 - 1) {
            for (let k = i; k <= 3 * (3 - 1); k += i) {
                lineDiag135.push(k)
            }
            diagonalWin135.push(lineDiag135)
        }
    }
    res = [...horizontalWin, ...verticalWin, ...diagonalWin45, ...diagonalWin135]
    return [res, horizontalWin, verticalWin, diagonalWin45, diagonalWin135];
}
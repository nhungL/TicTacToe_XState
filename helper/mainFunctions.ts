import * as helper3 from "./3x3";
import * as helper5 from "./5x5";

//function to create n squares
export function range(size: number, end: number) {
    var board = [];
    for (let i = 0; i < size; i++) {
        for (let j = i; j < end; j += size) {
            board.push(j)
        }
    }
    return board;
}

function randomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

//function to find best next move for computer to win
export async function bestMove(board: any[]) {
    console.log("find the best move")
    var bestScore = -Infinity;
    let move = null;
    var size = Math.sqrt(board.length);
    console.log({ size })
    // if (size == 3) {
        const board_2d = [];
        for (let i = 0; i < board.length; i += size) {
            board_2d.push(board.slice(i, i + size));
        }
        console.log(board_2d)
        for (let i = 0; i < board_2d.length; i++) {
            for (let j = 0; j < board_2d.length; j++) {
                if (board_2d[i][j] == "") {
                    board_2d[i][j] = "X";
                    let score = helper3.minimax3(board_2d, 0, false);
                    board_2d[i][j] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        move = j + board_2d.length * i;
                    }
                }
            }
        }
    // }
    // else {
    //     try {
    //         let res = setTimeout(minimax5(board, "X", 5, true), 100);
    //         res.then((data: { move: null; }) => {
    //             if (data.move != null) { move = data.move; };
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    console.log({ move });
    if (move == null) move = randomInt(0, 24);
    return move;
}

export function checkWinner(board: any[]) {
    var size = Math.sqrt(board.length);
    if (size == 3) {
        return helper3.checkWinner3x3(board, 3);
    }
    else {
        return helper5.checkWinner5x5(board, 5);
    }

}

export function generateWinningLines(input: number) {
    if (input == 3) {
        return helper3.allPossibleWin3x3();
    }
    else {
        return helper5.allPossibleWin5x5();
    }
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
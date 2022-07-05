// import { createContext, isContext } from "vm";
import { createMachine, assign, AnyEventObject, Interpreter, EventFrom } from "xstate";
import { createModel } from 'xstate/lib/model';
import { createContext } from 'react'

//Context
export const ticTacToeModelContext =  {
  size: 0,
  board: Array(),
  moves: 0,
  player: "X",
  winner: "",
  winning: Array(),
};
export interface ITTTContext {
	service: Interpreter<typeof ticTacToeModelContext, any, EventFrom<typeof ticTacToeModelEvents>, any>
}
export const TTTContext = createContext({} as ITTTContext)

//Events
export const ticTacToeModelEvents = {
  events: {
    '': () => ({}), // empty
    INITIALIZE: () => ({}),
    PLAY: () => ({}),
    RESET: () => ({})
  }
};

export function generateWinningLines(input: number) {
  const array = new Array(input * input).fill(0).map((_, i) => i)
  var res = [];
  var lineRow = new Array(input)
  for (let i = 0; i < input * input; i += input) {
    lineRow = array.slice(i, i + input)
    res.push(lineRow)
  }

  for (let i = 0; i < input; i += 1) {
    var lineCol = []
    for (let j = i; j < input * input; j += input) {
      lineCol.push(j)
    }
    res.push(lineCol)

    if (i == 0) {
      var lineDiagonal = []
      for (let k = i; k < input * input; k += (input + 1)) {
        lineDiagonal.push(k)
      }
      res.push(lineDiagonal)
    }
    if (i == input - 1) {
      var lineDiagonal = []
      for (let k = i; k <= input * (input - 1); k += i) {
        lineDiagonal.push(k)
      }
      res.push(lineDiagonal)
    }
  }
  return res;
}

export const ticTacToeModel = createModel(ticTacToeModelContext);
export const ticTacToeMachine = ticTacToeModel.createMachine(
  {
    id: "tictactoe",
    context: ticTacToeModel.initialContext,
    initial: "waiting",
    states: {
      waiting: {
        // entry: ["assignSize"],
        on: {
          INITIALIZE: { target: "playing", actions: ["assignSize", "initialBoard"] }
        }
      },
      playing: {
        "always": [
          { target: "winner", cond: "checkWin" },
          { target: "draw", cond: "checkDraw" }
        ],
        on: {
          PLAY: [
            {
              target: "playing",
              cond: "isValidMove",
              actions: "updateBoard"
            }
          ]
        }
      },
      winner: {
        entry: ["setWinner", "setWinningLine"]
      },
      draw: {}
    },
    on: {
      RESET: {
        target: "waiting",
        actions: "resetGame"
      }
    }
  },
  {
    actions: {
      assignSize: assign({
        size: (ctx, event: AnyEventObject) => {
          console.log("in update size board", {event});
          return ctx.size = event.value
        },
      }),
      initialBoard: assign({
        board: (ctx) => {
          console.log("in initialize board");
          let initialBoard = Array(ctx.size * ctx.size).fill("");
          return ctx.board = initialBoard;
        },
        winning: (ctx) => {
          console.log(ctx);
          return ctx.winning = Array(ctx.size).fill("");
        },
      }),
      updateBoard: assign({
        board: (context, event: AnyEventObject) => {
          const updatedBoard = [...context.board];
          console.log("in update board", event.value);
          updatedBoard[event.value] = context.player;
          return updatedBoard;
        },
        moves: (context) => context.moves + 1,
        player: (context) => (context.player === "X" ? "O" : "X")
      }),
      resetGame: assign(ticTacToeModel.initialContext),
      setWinner: assign({
        winner: (ctx) => (
          ctx.player === "X" ? "O" : "X"
        ),
      }),
      setWinningLine: assign({
        winner: (ctx) => (
          ctx.player === "X" ? "O" : "X"
        ),
      })
    },
    guards: {
      checkWin: (ctx) => {
        // console.log("in check winner")
        //all possible lines to win
        const winningLines = generateWinningLines(Math.sqrt(ctx.board.length));
        // console.log({winningLines})
        var xWon = true;
        for (let line of winningLines) {
          var xWon = true;
          var oWon = true;
          for (let index of line) {
            if (ctx.board[index] == "X") {
              continue;
            }
            else {
              xWon = false;
              break;
            }
          }

          for (let index of line) {
            if (ctx.board[index] == "O") {
              continue;
            }
            else {
              oWon = false;
              break;
            }
          }

          if (xWon || oWon) {
            ctx.winning = line;
            console.log("winning", ctx.winning)
            return true;
          }
        }
        return false;
      },
      checkDraw: (ctx) => {
        // return false
        // console.log("in check draw", ctx.board.length)
        return ctx.moves === ctx.board.length;
      },
      isValidMove: (ctx, event: AnyEventObject) => {
        // console.log("check valid move");
        return ctx.board[event.value] === "";
      },
    }
  },
);


const initialContext = {
  board: Array(9).fill(""),
  moves: 0,
  player: "X",
  winner: "",
  winning: Array(3).fill(""),
};


// export const ticTacToeMachine = createMachine(
//   {
//     id: "tictactoe",
//     initial: "playing",
//     context: initialContext,
//     states: {
//       playing: {
//         "always": [
//           { target: "winner", cond: "checkWin" },
//           { target: "draw", cond: "checkDraw" }
//         ],
//         on: {
//           PLAY: [
//             {
//               target: "playing",
//               cond: "isValidMove",
//               actions: "updateBoard"
//             }
//           ]
//         }
//       },
//       winner: {
//         entry: ["setWinner", "setWinningLine"]
//       },
//       draw: {}
//     },
//     on: {
//       RESET: {
//         target: "playing",
//         actions: "resetGame"
//       }
//     }
//   },
//   {
//     actions: {
//       updateBoard: assign({
//         board: (context, event: AnyEventObject) => {
//           const updatedBoard = [...context.board];
//           console.log("in update board", event.value);
//           updatedBoard[event.value] = context.player;
//           return updatedBoard;
//         },
//         moves: (context) => context.moves + 1,
//         player: (context) => (context.player === "X" ? "O" : "X")
//       }),
//       resetGame: assign(initialContext),
//       setWinner: assign({
//         winner: (ctx) => (
//           ctx.player === "X" ? "O" : "X"
//         ),
//       }),
//       setWinningLine: assign({
//         winner: (ctx) => (
//           ctx.player === "X" ? "O" : "X"
//         ),
//       })
//     },
//     guards: {
//       checkWin: (ctx) => {
//         // console.log("in check winner")

//         //all possible lines to win
//         const winningLines = generateWinningLines(Math.sqrt(ctx.board.length));
//         // console.log({winningLines})
//         var xWon = true;
//         for (let line of winningLines) {
//           var xWon = true;
//           var oWon = true;
//           for (let index of line) {
//             if (ctx.board[index] == "X") {
//               continue;
//             }
//             else {
//               xWon = false;
//               break;
//             }
//           }

//           for (let index of line) {
//             if (ctx.board[index] == "O") {
//               continue;
//             }
//             else {
//               oWon = false;
//               break;
//             }
//           }

//           if (xWon || oWon) {
//             ctx.winning = line;
//             console.log("winning", ctx.winning)
//             return true;
//           }
//         }
//         return false;
//       },
//       checkDraw: (ctx) => {
//         // return false
//         // console.log("in check draw", ctx.board.length)
//         return ctx.moves === ctx.board.length;
//       },
//       isValidMove: (ctx, event) => {
//         // console.log("check valid move");
//         return ctx.board[event.value] === "";
//       },
//     }
//   },
// );

import { AnyEventObject, Interpreter, EventFrom } from "xstate";
import { createModel } from 'xstate/lib/model';
import { createContext } from 'react'
import { bestMove, checkWinner, generateWinningLines } from "../helper/mainFunctions";


//Context
export const ticTacToeModelContext = {
  size: 0,
  board: Array(),
  moves: 0,
  player: "X",
  winner: "",
  winning: Array(),
  winningLines: Array(),
};
export interface ITTTContext {
  service: Interpreter<
    typeof ticTacToeModelContext,
    any,
    EventFrom<typeof ticTacToeMachine>,
    any,
    any>
}
export const TTTContext = createContext({} as ITTTContext)

//Events
export const ticTacToeModelEvents = {
  events: {
    '': () => ({}), // empty
    INITIALIZE: () => ({}),
    PLAY: () => ({}),
    FINDMOVE: () => ({}),
    winner: () => ({}),
    RESET: () => ({}),
    BACK: () => ({}),
  }
};


export const ticTacToeModel = createModel(ticTacToeModelContext, ticTacToeModelEvents);
export const ticTacToeMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBjZBDTB7MAdAO5apoB2UAxAJIByNAKjQIIAyNAWgKKKgAOuWGVS5yfEAA9EAWgCMAZgDsBAKwAWVQAYAHOp06ATKrk6AnABoQAT1lz1ANgJnDS+w7frD6s2YC+flZomDjI+AT8ADZY1qiUVAAKbCwAmhKCwmhiEtIIMqoE+kraZqpmWkrF6loKVrZ5roYECq5KhmYKZQ7qCmZKAUEY2HiEUTFx1OlCItlIUohyZuoEDjpySjpaDlrqjg6GdXYOBb1rcg6mfabHAyDBw2FgVABK3ADK3IxTmaLic7kydRyJo6JQ1XYVLSGOQaQ55RRNDo+JSrBS9OQVHQBQIgci4CBwCT3ULhEgiSjfGZ-UAA1xOYyqSqgmpbNEOOHyRaFVQtQzdByrFw6By3YkjCLRWIUuYZKk5RDGAhQlmaHZmfYKIwcuQY7mbKHaEzaLaioYkwhEOLkMAAJ0pWWp8wQPQUBGhOx5PK0qkZ6m1POc0MZ210CgqClNIXFEBtWCI9t+8ry1R0hX2mxaDk6Sj9NlkCicWiLCJaS1MihFOLFjwTsxpsh6TmZCghYKDufqMmzbt84cUWgxFXU2L8QA */
  ticTacToeModel.createMachine(
    {
      context: ticTacToeModel.initialContext,
      schema: { context: {} as typeof ticTacToeModelContext },
      preserveActionOrder: true,
      id: "tictactoe",
      initial: "waiting",
      states: {
        waiting: {
          on: {
            INITIALIZE: {
              actions: ["assignSize", "initialBoard"],
              target: "XTurn",
            },
          },
        },
        XTurn: {
          always: [
            {
              cond: "checkWin",
              target: "winner",
            },
            {
              cond: "checkDraw",
              target: "draw",
            },
            {
              target: "OTurn",
              actions: "updateBoard",
            },
          ]
        },
        OTurn: {
          after: {
            50:[
              {
                cond: "checkWin",
                target: "winner",
              },
              {
                cond: "checkDraw",
                target: "draw",
              },
            ],
          },
          on: {
            PLAY: {
              actions: "updateBoard",
              cond: "isValidMove",
              target: "XTurn",
            },
          },
        },
        winner: {
          entry: ["setWinner", "setWinningLine"],
        },
        draw: {},
      },
      on: {
        BACK: {
          actions: "resetGame",
          target: "waiting",
        },
        RESET: {
          actions: "resetBoard",
          target: "XTurn",
        },
      },
    },
    {
      actions: {
        assignSize: ticTacToeModel.assign({
          size: (ctx, event: AnyEventObject) => {
            // console.log("in update size board", { event });
            return ctx.size = event.value
          },
        }),
        initialBoard: ticTacToeModel.assign({
          board: (ctx) => {
            // console.log("in initialize board");
            let initialBoard = Array(ctx.size * ctx.size).fill("");
            return ctx.board = initialBoard;
          },
          winning: (ctx) => {
            return ctx.winning = Array(ctx.size).fill("");
          },
          winningLines: (ctx) => {
            return ctx.winningLines = generateWinningLines(ctx.size)[0]
          }
        }),
        updateBoard: ticTacToeModel.assign({
          board: (ctx, event: AnyEventObject) => {
            const updatedBoard = [...ctx.board];
            if (ctx.player == "O") {
              console.log("PLAYER O: ", event.value);
              updatedBoard[event.value] = ctx.player;
            }
            else {
              console.log("FIND MOVE FOR X")
              //first move always be [0][0]
              if (ctx.board[0] == "") {
                updatedBoard[0] = ctx.player;
              }
              else {
                let res = bestMove(ctx.board);
                res.then((idx) => {
                  if (idx != null && updatedBoard[idx] == '')
                    updatedBoard[idx] = ctx.player;
                })
              }
            }
            console.log({ updatedBoard })
            return ctx.board = updatedBoard;
          },
          moves: (ctx) => ctx.moves + 1,
          player: (ctx) => (ctx.player === "X" ? "O" : "X")
        }),
        resetBoard: ticTacToeModel.assign({
          board: (ctx) => {
            console.log("in initialize board");
            let initialBoard = Array(ctx.size * ctx.size).fill("");
            return ctx.board = initialBoard;
          },
          winning: (ctx) => {
            return ctx.winning = Array(ctx.size).fill("");
          },
          winningLines: (ctx) => {
            return ctx.winningLines = generateWinningLines(ctx.size)[0]
          },
          moves: (ctx) => (ctx.moves = 0),
          winner: (ctx) => (ctx.winner = ""),
          player: (ctx) => (ctx.player = "X"),
        }),
        resetGame: ticTacToeModel.assign(ticTacToeModel.initialContext),
        setWinner: ticTacToeModel.assign({
          winner: (ctx) => (
            ctx.player = checkWinner(ctx.board).winner
          ),
        }),
        setWinningLine: ticTacToeModel.assign({
          winning: (ctx) => {
            var res = checkWinner(ctx.board);
            return ctx.winning = res.winningLine
          }
        })
      },
      guards: {
        checkWin: (ctx) => {
          console.log("check win")
          return checkWinner(ctx.board).winner == "X" || checkWinner(ctx.board).winner == "O";
        },
        checkDraw: (ctx) => {
          console.log("check draw")
          return checkWinner(ctx.board).winner == "tie";
        },
        isValidMove: (ctx, event: AnyEventObject) => {
          console.log("check valid move")
          return ctx.board[event.value] === "";
        },
      }
    },
  );

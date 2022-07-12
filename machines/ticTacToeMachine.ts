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
          always: [
            {
              cond: "checkWin",
              target: "winner",
            },
            {
              cond: "checkDraw",
              target: "draw",
            },
          ],
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
        RESET: {
          actions: "resetGame",
          target: "waiting",
          internal: false,
        },
      },
    },
    {
      actions: {
        assignSize: ticTacToeModel.assign({
          size: (ctx, event: AnyEventObject) => {
            console.log("in update size board", { event });
            return ctx.size = event.value
          },
        }),
        initialBoard: ticTacToeModel.assign({
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
          }
        }),
        updateBoard: ticTacToeModel.assign({
          board: (ctx, event: AnyEventObject) => {
            const updatedBoard = [...ctx.board];
            if (ctx.player == "O") {
              updatedBoard[event.value] = ctx.player;
            }
            else {
              console.log("FIND MOVE FOR X")
              let idx = bestMove(ctx.board, ctx.winningLines);
              if (idx != null && updatedBoard[idx] == '') {
                updatedBoard[idx] = ctx.player;
              }
            }
            return updatedBoard;
          },
          moves: (ctx) => ctx.moves + 1,
          player: (ctx) => (ctx.player === "X" ? "O" : "X")
        }),
        resetGame: ticTacToeModel.assign(ticTacToeModel.initialContext),
        setWinner: ticTacToeModel.assign({
          winner: (ctx) => (
            ctx.player === "X" ? "O" : "X"
          ),
        }),
        setWinningLine: ticTacToeModel.assign({
          winning: (ctx) => {
            var res = checkWinner(ctx.board, ctx.winningLines);
            return ctx.winning = res.winningLine
          }
        })
      },
      guards: {
        checkWin: (ctx) => {
          console.log("check win")
          return checkWinner(ctx.board, ctx.winningLines).winner != "";
        },
        checkDraw: (ctx) => {
          console.log("check draw")
          return ctx.moves === ctx.board.length;
        },
        isValidMove: (ctx, event: AnyEventObject) => {
          console.log("check valid move")
          return ctx.board[event.value] === "";
        },
      }
    },
  );

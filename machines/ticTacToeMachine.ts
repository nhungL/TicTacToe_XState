import { createMachine, assign, AnyEventObject } from "xstate";

const initialContext = {
  board: Array(9).fill(""),
  moves: 0,
  player: "X",
  winner: ""
};
function generateWinningLines (input: number) {
  const array = new Array(input*input).fill(0).map((_,i) => i )
  var res = [];
  var lineRow = new Array(input)
  for (let i=0; i < input*input; i+=input){
    lineRow = array.slice(i, i+input)
    res.push(lineRow)
  }

  for (let i=0; i < input; i+=1){
    var lineCol = []
    for (let j=i; j < input*input; j+=input){
      lineCol.push(j)
    }
    res.push(lineCol)

    if(i == 0 ){
      var lineDiagonal = []
      for (let k=i; k < input*input; k+=(input+1)){
        lineDiagonal.push(k)
      }
      res.push(lineDiagonal)
    }   
    if(i == input-1 ){
      var lineDiagonal = []
      for (let k=i; k <= input*(input-1); k+=i){
        lineDiagonal.push(k)
      }
      res.push(lineDiagonal)
    }
  }
  return res;
}

export const ticTacToeMachine = createMachine(
  {
    id: "tictactoe",
    initial: "playing",
    context: initialContext,
    states: {
      playing: {
        on: {
          "": [
            { target: "winner", cond: "checkWin" },
            { target: "draw", cond: "checkDraw" }
          ],
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
        entry: "setWinner"
      },
      draw: {}
    },
    on: {
      RESET: {
        target: "playing",
        actions: "resetGame"
      }
    }
  },
  {
    actions: {
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
      resetGame: assign(initialContext),
      setWinner: assign({
        winner: (ctx) => (
          ctx.player === "X" ? "O" : "X"
        )
      })
    },
    guards: {
      checkWin: (ctx) => {
        // console.log("in check winner")

        //all possible lines to win
        const winningLines = generateWinningLines(Math.sqrt(ctx.board.length));
        console.log({winningLines})

        for (let line of winningLines) {
          //check if X wins
          const xWon = line.every((index) => {
            if (ctx.board[index] != "X" ) {
              // console.log("X not win yet");
              return false;
            }
            else { return true }

          });
          //check if O wins
          const oWon = line.every((index) => {
            if (ctx.board[index] != "O") {
              // console.log("O not win yet");
              return false;
            }
            else { return true }
          });

          //check if X or O wins
          if (xWon || oWon) {
            console.log("X or O WON")
            return true
          }
        }
        return false
      },
      checkDraw: (ctx) => {
        // return false
        // console.log("in check draw", ctx.board.length)
        return ctx.moves === ctx.board.length;
      },
      isValidMove: (ctx, event) => {
        // console.log("check valid move");
        return ctx.board[event.value] === "";
      },
    }
  },
);

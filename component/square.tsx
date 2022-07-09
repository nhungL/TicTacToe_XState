import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { TTTContext } from "../machines/ticTacToeMachine";
import styles from "../styles/Home.module.css";
import * as helper from "../helper/mainFunctions";
import { WinningLine } from "./winningLine";

//variables in square
interface SquareProps {
  value: number;
  win: boolean;
  winningLines: any[][];
}

//create a square with value passed to machine
export const Square = (props: SquareProps) => {
  const { service } = useContext(TTTContext);
  const board = useSelector(service, (state) => {
    return state.context.board;
  });
  const boardSizeSelector = (state: any) => state.context.board.length;
  const boardSize = useSelector(service, boardSizeSelector);
  const playerSelector = (state: any) => state.context.player;
  const player = useSelector(service, playerSelector);
  const winningLine = useSelector(service, (state) => {
    return state.context.winning;
  });

  function normalSquare(props: SquareProps) {
    return (
      <button
        className={styles.square}
        id="button"
        onClick={() => {
          service.send("PLAY", { value: props.value });
        }}
      >
        {board[props.value]}
      </button>
    );
  }

  // check winner
  if (props.win) {
    return (
      <button id="winSquare" className={styles.squareHighLight}>
        <WinningLine />
        {board[props.value]}
      </button>
    );
  } else {
    // Player X
    if (player == "X") {
      let value = helper.bestMove(board, props.winningLines);
      // console.log({ value });
      //update board with index chosen from bestMove();
      if (props.value == value) {
        service.send("PLAY", { value: value });
        return (
          <button className={styles.square} id="ai">
            {board[props.value]}
          </button>
        );
      }
      return normalSquare(props);
    } else {
      // player O
      return normalSquare(props);
    }
  }
};

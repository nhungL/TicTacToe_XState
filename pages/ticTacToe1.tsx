import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMachine } from "@xstate/react";
import {
  ticTacToeMachine,
} from "../machines/ticTacToeMachine";
import * as helper from "../helper/mainFunctions";

const TicTacToe: NextPage = () => {
  const [current, send] = useMachine(ticTacToeMachine);

  // choose size
  const handleSelectSizeBoard = () => {
    if (typeof window !== "undefined") {
      var e = document.getElementById("select1") as HTMLSelectElement;
      var value = parseInt(e.value);
      console.log("size chosen", value);
      send("INITIALIZE", { value: value });
    }
  };

  //render title of game
  function renderTitle() {
    // console.log(current);
    if (current.value == "waiting") {
      return (
        <div>
          <p className={styles.smalltitle}>
            I want to play:
            <select id="select1" className={styles.option}>
              <option value="0">Select</option>
              <option value="3">3x3</option>
              {/* <option value="5">5x5</option> */}
            </select>
            <button className={styles.option} onClick={handleSelectSizeBoard}>
              PLAY
            </button>
          </p>
        </div>
      );
    }
    if (current.value == "playing") {
      return (
        <p className={styles.subtitle}>Your turn: {current.context.player}</p>
      );
    }
    if (current.value == "winner") {
      return (
        <div>
          <p className={styles.subtitle}>
            Congrats! {current.context.winner} wins
          </p>
          <p className={styles.smalltitle}>Click reset button to play again</p>
        </div>
      );
    }
    if (current.value == "draw") {
      return (
        <div>
          <p className={styles.subtitle}>It&apos;s a tie</p>
          <p className={styles.smalltitle}>Click reset button to play again</p>
        </div>
      );
    }
  }

  //variables in square
  interface SquareProps {
    value: number;
    winningLine: boolean;
  }

  function normalSquare(props: SquareProps) {
    return (
      <button
        className={styles.square}
        id="button"
        onClick={() => {
          send("PLAY", { value: props.value });
        }}
      >
        {current.context.board[props.value]}
      </button>
    );
  }

  //create a square with value passed to machine
  let win = false;
  const winningLines = current.context.winningLines;
  function Square(props: SquareProps) {
    // check winner
    if (props.winningLine && current.context.winning.includes(props.value)) {
      win = true;
      return (
        <button id="winSquare" className={`${styles.squareHighLight}`}>
          {current.context.board[props.value]}
        </button>
      );
    } else {
      // Player X
      if (current.context.player == "X") {
        let value = helper.bestMove(current, winningLines);
        console.log({ value });
        
        //update board with index chosen from bestMove();
        if (props.value == value) {
          send("PLAY", { value: value });
          return (
            <button className={styles.square} id="ai">
              {current.context.board[props.value]}
            </button>
          );
        }
        return normalSquare(props);
      }
      // player O
      else {
        return normalSquare(props);
      }
    }
  }

  const renderBoard = helper.range(0, current.context.board.length).map((i) => {
    return (
      <Square key={i} value={i} winningLine={current.context.winner != ""} />
    );
  });

  // main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div>{renderTitle()}</div>
        {current.context.board.length != 0 && (
          <div className={styles.wrapper}>
            <div className={styles.boardGrid}>{renderBoard}</div>
          </div>
        )}

        <div>
          <button
            className={styles.resetButton}
            onClick={() => {
              send("RESET");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;

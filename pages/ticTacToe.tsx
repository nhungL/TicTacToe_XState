import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMachine } from "@xstate/react";
import { ticTacToeMachine } from "../machines/ticTacToeMachine";

const TicTacToe: NextPage = () => {
  const [current, send] = useMachine(ticTacToeMachine);

  //reset game
  const handleReset = () => {
    console.log("handleReset");
    send("RESET");
  };

  //render title of game
  function renderTitle() {
    console.log(current.context);
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
          <p className={styles.subtitle}>It's a tie</p>
          <p className={styles.smalltitle}>Click reset button to play again</p>
        </div>
      );
    }
  }

  //function to create n squares
  function range(start: number, end: number) {
    return Array(end - start)
      .fill(null)
      .map((_, i) => i + start);
  }

  //variables in square
  interface SquareProps {
    value: number;
  }

  //create a square with value passed to machine
  function Square(props: SquareProps) {
    // console.log(current);
    return (
      <button
        className={styles.square}
        onClick={() =>
          send({
            type: "PLAY",
            value: props.value,
          })
        }
      >
        {current.context.board[props.value]}
        {/* {props.value} */}
      </button>
    );
  }

  //main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div className={styles.title}>{renderTitle()}</div>
        <div className={styles.boardGrid}>
          {range(0, 9).map((i) => {
            return <Square key={i} value={i} />;
          })}
        </div>
        <div>
          <button className={styles.resetButton} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;

import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMachine } from "@xstate/react";
import { ticTacToeMachine } from "../machines/ticTacToeMachine";
import styled from "styled-components";
import { render } from "react-dom";

const TicTacToe: NextPage = () => {
  const [current, send] = useMachine(ticTacToeMachine);

  //reset game
  const handleReset = () => {
    console.log("handleReset");
    send("RESET");
  };

  //render title of game
  function renderTitle() {
    // console.log(current.context);
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

  // var x1 = 70.45454406738281;
  // var y1 = 534.5;
  // var x2 = 422.5;
  // var y2 = 816.5;

  var x1 = 0;
  var y1 = 0;
  var x2 = 0;
  var y2 = 0;
  //function to create n squares
  function range(start: number, end: number) {
    return Array(end - start)
      .fill(null)
      .map((_, i) => i + start);
  }

  function getCoordinates() {
    var el = document.getElementById("button");
    if (el) {
      if (x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0) {
        // x1 =
        //   (el?.getBoundingClientRect().bottom - el?.getBoundingClientRect().top) *
        //   0.5;
        x1 = el?.offsetLeft + el?.offsetWidth / 2;
        y1 = el?.offsetTop + el?.offsetHeight / 2;
        x2 = el?.offsetLeft + el?.offsetWidth / 2;
        y2 = el?.offsetTop + el?.offsetHeight / 2;
      } else {
        x2 = el?.offsetLeft + el?.offsetWidth / 2;
        y2 = el?.offsetTop + el?.offsetHeight / 2;
      }
    }
    console.log({ x1, y1 });
    console.log({ x2, y2 });
    return [x1, x2, y1, y2];
  }

  //variables in square
  interface SquareProps {
    value: number;
    // winningLine: any[];
    winningLine: boolean;
  }

  //create a square with value passed to machine
  let win = false;
  function Square(props: SquareProps) {
    // if having winner => change styling of winning squares
    if (props.winningLine && current.context.winning.includes(props.value)) {
      // console.log(props.value);
      win = true;
      return (
        <button id="winSquare" className={`${styles.squareHighLight}`}>
          {current.context.board[props.value]}
        </button>
      );
    } else {
      return (
        <button
          className={styles.square}
          id="button"
          onClick={() => {
            send({
              type: "PLAY",
              value: props.value,
            });
          }}
        >
          {current.context.board[props.value]}
        </button>
      );
    }
  }

  const renderBoard = range(0, 9).map((i) => {
    return (
      <Square key={i} value={i} winningLine={current.context.winner != ""} />
    );
  });

  //main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div>{renderTitle()}</div>
        <div className={styles.wrapper}>
          {/* {current.context.winner != "" && (
            <div className={styles.svg}>
              <svg
                className={styles.svg}
                viewBox="0 0 500 500"
                preserveAspectRatio="xMidYMid slice"
              >
                <line
                  className={styles.lineHorizontal}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
              </svg>
            </div>
          )} */}

          <div className={styles.boardGrid}>{renderBoard}</div>
        </div>

        <div>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;

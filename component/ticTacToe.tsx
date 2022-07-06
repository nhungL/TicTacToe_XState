import type { NextPage } from "next";
import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { useSelector } from "@xstate/react";
import {
  ticTacToeMachine, ticTacToeModelContext, TTTContext,
} from "../machines/ticTacToeMachine";
import * as helper from "../helper/mainFunctions";

const ticTacToe: NextPage = () => {
  const {service} = useContext(TTTContext);
  service.start()

  const currState = useSelector(service, (state) => {return state.value;})
  const boardSizeSelector = (state: any) => state.context.board.length;
  const boardSize = useSelector(service, boardSizeSelector);
  const playerSelector = (state: any) => state.context.player;
  const player = useSelector(service, playerSelector);
  const winner = useSelector(service, (state) => {
    return state.context.winner;
  });
  const board = useSelector(service, (state) => {
    return state.context.board;
  });
  const winningLine = useSelector(service, (state) => {
    return state.context.winning;
  });


  // choose size
  const handleSelectBoardSize = () => {
    if (typeof window !== "undefined") {
      var e = document.getElementById("select1") as HTMLSelectElement;
      var value = parseInt(e.value);
      console.log("size chosen", value);
      service.send("INITIALIZE", { value: value });
    }
  };

  //render title of game
  function renderTitle() {
    // console.log(current);
    if (currState == "waiting") {
      return (
        <div>
          <p className={styles.smalltitle}>
            I want to play:
            <select id="select1" className={styles.option}>
              <option value="0">Select</option>
              <option value="3">3x3</option>
              {/* <option value="5">5x5</option> */}
            </select>
            <button className={styles.option} onClick={handleSelectBoardSize}>
              PLAY
            </button>
          </p>
        </div>
      );
    }
    if (currState == "playing") {
      return (
        <p className={styles.subtitle}>Your turn: {player}</p>
      );
    }
    if (currState == "winner") {
      return (
        <div>
          <p className={styles.subtitle}>
            Congrats! {winner} wins
          </p>
          <p className={styles.smalltitle}>Click reset button to play again</p>
        </div>
      );
    }
    if (currState == "draw") {
      return (
        <div>
          <p className={styles.subtitle}>It's a tie</p>
          <p className={styles.smalltitle}>Click reset button to play again</p>
        </div>
      );
    }
  }

  //variables in square
  interface SquareProps {
    value: number;
    win: boolean;
  }

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

  //create a square with value passed to machine
  let win = false;
  function Square(props: SquareProps) {
    // check winner
    if (props.win && winningLine.includes(props.value)) {
      win = true;
      return (
        <button id="winSquare" className={`${styles.squareHighLight}`}>
          {board[props.value]}
        </button>
      );
    } else {
      // Player X
      if (service.state.context.player == "X") {
        let value = helper.bestMove(service.state);
        console.log({ value });
        
        //update board with index chosen from bestMove();
        if (props.value == value) {
          service.send( "PLAY", {value: value });
          return (
            <button className={styles.square} id="ai">
              {board[props.value]}
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

  const renderBoard = helper.range(0, boardSize).map((i) => {
    console.log("in renderBoard")
    return (
      <Square key={i} value={i} win={winner !== ""} />
    );
  });

  // main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div>{renderTitle()}</div>
        {boardSize != 0 && (
          <div className={styles.wrapper}>
            {/* {current.context.winner != "" && (
            <div className={styles.svg}>
              <svg
                className={styles.svg}
                viewBox="0 0 500 500"
                preserveAspectRatio="xMidYMid slice"s
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
        )}

        <div>
          <button
            className={styles.resetButton}
            onClick={() => {
              service.send("RESET");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default ticTacToe;

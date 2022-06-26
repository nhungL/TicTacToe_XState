import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMachine } from "@xstate/react";
import { ticTacToeMachine } from "../machines/ticTacToeMachine";
import Board from "../components/board";

const TicTacToe: NextPage = () => {
  // Typescript will infer what current and send are here
  // And will provide useful information about usage
  const [current, send] = useMachine(ticTacToeMachine);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
      <div className={styles.title}>Play Tic Tac Toe</div>
        <Board />
        <div className={styles.resetButton}>
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;

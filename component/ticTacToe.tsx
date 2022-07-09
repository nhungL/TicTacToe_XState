import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { useSelector } from "@xstate/react";
import { TTTContext } from "../machines/ticTacToeMachine";
import * as helper from "../helper/mainFunctions";
import styled from "styled-components";
import { renderTitle } from "./title";
import { Square } from "./square";

const ticTacToe = () => {
  const { service } = useContext(TTTContext);
  console.log(service);
  service.start();

  const currState = useSelector(service, (state) => {
    return state.value;
  });
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

  const winningLines = helper.generateWinningLines(Math.sqrt(board.length))[0];
  const renderBoard = helper.range(0, boardSize).map((i) => {
    return <Square key={i} value={i} win={winningLine.includes(i)} winningLines={winningLines}/>;
  });

  // main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div>{renderTitle(currState, player, winner)}</div>
        {boardSize != 0 && (
          <div className={styles.wrapper}>
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

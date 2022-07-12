import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { useSelector } from "@xstate/react";
import { TTTContext } from "../machines/ticTacToeMachine";
import { renderTitle } from "./title";
import { Board } from "./board";

const ticTacToe = () => {
  const { service } = useContext(TTTContext);
  service.start();

  const currState = useSelector(service, (state) => {
    return state.value;
  });
  const boardSizeSelector = (state: any) => state.context.board.length;
  const boardSize = useSelector(service, boardSizeSelector);

  // main page
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Tic Tac Toe</div>
        <div>{renderTitle()}</div>
        
        {boardSize != 0 && (
          <div className={styles.wrapper}>
            <Board />
          </div>
        )}

        {(currState == "draw" || currState == "winner") && (
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
        )}

      </div>
    </div>
  );
};
export default ticTacToe;

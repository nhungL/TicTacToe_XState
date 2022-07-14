import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { useSelector } from "@xstate/react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { renderTitle } from "../title/renderTitle";
import { Board } from "../board/board";
import {Footer} from "../footer/footer";
import { TTTContainer } from "./styles";

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
    <TTTContainer>
      <div className="main">
        <div className="mainContent">
          <div className="title">Tic Tac Toe</div>
          <div>{renderTitle()}</div>

          {boardSize != 0 && (
            <div className="wrapper">
              <Board />
            </div>
          )}

          {(currState !== "waiting") && (
            <div>
              <button
                className="resetButton"
                onClick={() => {
                  service.send("RESET");
                }}
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div>{<Footer />}</div>
      </div>
    </TTTContainer>
  );
};
export default ticTacToe;

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useSelector } from "@xstate/react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { renderTitle } from "../title/renderTitle";
import { Board } from "../board/board";
import { Footer } from "../footer/footer";
import { TTTContainer } from "./styles";

const ticTacToe = () => {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        const handleResize = () => {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();

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
          {size.width < 650 && (
            <div className="error">
              <span>ALERT: Small window size!</span>
            </div>
          )}
          <div className="title">Tic Tac Toe</div>
          <div>{renderTitle()}</div>

          {boardSize != 0 && (
            <div className="wrapper">
              <Board />
            </div>
          )}

          {currState !== "waiting" && (
            <div className="button">
              <button
                className="backButton"
                onClick={() => {
                  service.send("BACK");
                }}
              >
                Reset Size
              </button>
              <button
                className="play-again-button"
                onClick={() => {
                  service.send("RESET");
                }}
              >
                Play Again
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

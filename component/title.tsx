import { useSelector } from "@xstate/react";
import { useContext, useState } from "react";
import styled from "styled-components";
import { StateValue } from "xstate";
import { TTTContext } from "../machines/ticTacToeMachine";
import styles from "../styles/Home.module.css";

//render title of game
export const renderTitle = () => {
  const { service } = useContext(TTTContext);
  const currState = useSelector(service, (state) => {
    return state.value;
  });
  const playerSelector = (state: any) => state.context.player;
  const player = useSelector(service, playerSelector);
  const winner = useSelector(service, (state) => {
    return state.context.winner;
  });

  const [error, setError] = useState(false);

  const handleSelectBoardSize = () => {
    if (typeof window !== "undefined") {
      var e = document.getElementById("select1") as HTMLSelectElement;
      if (e.value == "0") {
        setError(true);
      } else {
        setError(false);
        var value = parseInt(e.value);
        console.log("size chosen", value);
        service.send("INITIALIZE", { value: value });
      }
    }
  };

  if (currState == "waiting") {
    return (
      <div>
        <div className={styles.smalltitle}>
          Choose a board size:
          <select id="select1" className={styles.option}>
            <option value="0">Select</option>
            <option value="3">3x3</option>
            <option value="5">5x5</option>
          </select>
          <br />
          {error && (
            <div className={styles.error}>
              <span>Board size is required.</span>
            </div>
          )}
          <button
            className={styles.resetButton}
            onClick={handleSelectBoardSize}
          >
            PLAY
          </button>
        </div>
      </div>
    );
  }
  if (currState == "XTurn" || currState == "OTurn") {
    return <p className={styles.subtitle}>Your turn: {player}</p>;
  }
  if (currState == "winner") {
    return (
      <div>
        <p className={styles.subtitle}>Congrats! {winner} won</p>
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
};

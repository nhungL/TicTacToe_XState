import { useSelector } from "@xstate/react";
import { useContext, useState } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import styles from "../../styles/Home.module.css";
import { WaitingLayout } from "./waitingLayout";

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

  if (currState == "waiting") {
    return (
      <WaitingLayout/>
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

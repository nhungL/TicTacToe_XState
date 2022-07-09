import { useContext } from "react";
import { StateValue } from "xstate";
import { TTTContext } from "../machines/ticTacToeMachine";
import styles from "../styles/Home.module.css";

//render title of game
export const renderTitle = (
  currState: StateValue,
  player: any,
  winner: string
) => {
  const { service } = useContext(TTTContext);
  // console.log(service);
  const handleSelectBoardSize = () => {
    if (typeof window !== "undefined") {
      var e = document.getElementById("select1") as HTMLSelectElement;
      var value = parseInt(e.value);
      console.log("size chosen", value);
      service.send("INITIALIZE", { value: value });
    }
  };
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

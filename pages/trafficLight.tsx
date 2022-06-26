import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useMachine } from "@xstate/react";
import { trafficLightMachine } from "../machines/trafficLightMachine";

const TrafficLight: NextPage = () => {
  // Typescript will infer what current and send are here
  // And will provide useful information about usage
  const [current, send] = useMachine(trafficLightMachine);

  return (
    <div className={styles.trafficBody}>
      <div className={styles.pole}>
        <section>
          <div className={styles.TrafficLight}>
            <input
              type="radio"
              readOnly
              className={`${styles.light} ${styles.red} ${styles.input}`}
              checked={current.matches("red")}
            />
            <input
              type="radio"
              readOnly
              className={`${styles.light} ${styles.yellow} ${styles.input}`}
              checked={current.matches("yellow")}
            />
            <input
              type="radio"
              readOnly
              className={`${styles.light} ${styles.green} ${styles.input}`}
              checked={current.matches("green")}
            />
          </div>
        </section>
      </div>
      <div>
        <button onClick={() => send("NEXT")}>NEXT</button>
      </div>
    </div>
  );
};
export default TrafficLight;

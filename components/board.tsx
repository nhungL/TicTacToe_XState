import styles from "../styles/Home.module.css";
import React from "react";
import Square from "./square";

export default function Board() {
  return (
    <div>
      <div className={styles.boardRow}>
        <div className={styles.boardColumn}>
          {Square(0)}
          {Square(1)}
          {Square(2)}
        </div>
        <div className={styles.boardColumn}>
          {Square(3)}
          {Square(4)}
          {Square(5)}
        </div>
        <div className={styles.boardColumn}>
          {Square(6)}
          {Square(7)}
          {Square(8)}
        </div>
      </div>
    </div>
  );
}

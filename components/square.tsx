import styles from "../styles/Home.module.css";
import React, { useState } from "react";

export default function Square(input: any) {
    const [num, setNum] = useState(input);
    const handleInputChange = (e: any) => {
        e.preventDefault();
        setNum(input)
    }
  return (
    <div>
      <button className={styles.square} onClick={handleInputChange}>{num}</button>
    </div>
  );
}


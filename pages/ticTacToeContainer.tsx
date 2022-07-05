import type { NextPage } from "next";
import React, { useContext, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { useInterpret, useMachine } from "@xstate/react";
import {
  ticTacToeMachine,
  ticTacToeModel,
  ticTacToeModelContext,
  TTTContext,
} from "../machines/ticTacToeMachine";
import styled from "styled-components";
import { interpret } from "xstate";
import { waitFor } from "xstate/lib/waitFor";
import { useSelector } from "@xstate/react";
import TicTacToe from "./hooks/ticTacToe";
import { DndProvider } from "react-dnd-multi-backend";

// const service = useInterpret(ticTacToeMachine).onTransition((state) => {
//   console.log(state.value, service.state.context);
// });

const ticTacToeContainer: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const authService = useInterpret(ticTacToeMachine, {
    context: ticTacToeModelContext,
  });
  console.log(authService)
  // const { service } = useContext(ticTacToeModelContext)
  const { send: dispatch } = authService;
  const boardSize = useSelector(authService, (state) => {
    return state.context.size;
  });
  console.log(boardSize);
  // console.log(size);

  return (
    <div>
      <TTTContext.Provider value={{ authService }}>
        <TicTacToe />
      </TTTContext.Provider>
    </div>
  );

  // const [current, send] = useMachine(ticTacToeMachine);

  // service.start();
  // const selectSize = (service) => service.state.context.size;
  // const size = useSelector(service, selectSize);
  // const service = useInterpret(ticTacToeMachine).onTransition((state) => {
  //   console.log(state.value, service.state.context);
  // });

  // TicTacToe(service);
  // // console.log({selectSize});
  // // console.log(service.state.context);

  // // choose size
  // const handleSelectSizeBoard = () => {
  //   if (typeof window !== "undefined") {
  //     var e = document.getElementById("select1") as HTMLSelectElement;
  //     var value = parseInt(e.value);
  //     console.log("size chosen", value);
  //     service.send("INITIALIZE", { value: value });
  //   }
  // };

  // // // console.log(size);

  // //reset game
  // const handleReset = () => {
  //   console.log("handleReset");
  //   service.send("RESET");
  // };

  // //render title of game
  // function renderTitle() {
  //   console.log(service.state);
  //   if (service.state.value == "waiting") {
  //     return (
  //       <div>
  //         <p>
  //           Choose size board:
  //           <select id="select1">
  //             <option >Select an option</option>
  //             <option value="3">3x3</option>
  //             <option value="5">5x5</option>
  //           </select>
  //           <button onClick={handleSelectSizeBoard}>Done</button>
  //         </p>
  //       </div>
  //     );
  //   }
  //   if (service.state.value == "playing") {
  //     return (
  //       <p className={styles.subtitle}>
  //         Your turn: {service.state.context.player}
  //       </p>
  //     );
  //   }
  //   if (service.state.value == "winner") {
  //     return (
  //       <div>
  //         <p className={styles.subtitle}>
  //           Congrats! {service.state.context.winner} wins
  //         </p>
  //         <p className={styles.smalltitle}>Click reset button to play again</p>
  //       </div>
  //     );
  //   }
  //   if (service.state.value == "draw") {
  //     return (
  //       <div>
  //         <p className={styles.subtitle}>It's a tie</p>
  //         <p className={styles.smalltitle}>Click reset button to play again</p>
  //       </div>
  //     );
  //   }
  // }

  // // var x1 = 70.45454406738281;
  // // var y1 = 534.5;
  // // var x2 = 422.5;
  // // var y2 = 816.5;

  // var x1 = 0;
  // var y1 = 0;
  // var x2 = 0;
  // var y2 = 0;
  // //function to create n squares
  // function range(start: number, end: number) {
  //   return Array(end - start)
  //     .fill(null)
  //     .map((_, i) => i + start);
  // }

  // // function getCoordinates() {
  // //   var el = document.getElementById("button");
  // //   if (el) {
  // //     if (x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0) {
  // //       // x1 =
  // //       //   (el?.getBoundingClientRect().bottom - el?.getBoundingClientRect().top) *
  // //       //   0.5;
  // //       x1 = el?.offsetLeft + el?.offsetWidth / 2;
  // //       y1 = el?.offsetTop + el?.offsetHeight / 2;
  // //       x2 = el?.offsetLeft + el?.offsetWidth / 2;
  // //       y2 = el?.offsetTop + el?.offsetHeight / 2;
  // //     } else {
  // //       x2 = el?.offsetLeft + el?.offsetWidth / 2;
  // //       y2 = el?.offsetTop + el?.offsetHeight / 2;
  // //     }
  // //   }
  // //   console.log({ x1, y1 });
  // //   console.log({ x2, y2 });
  // //   return [x1, x2, y1, y2];
  // // }

  // //variables in square
  // interface SquareProps {
  //   value: number;
  //   winningLine: boolean;
  // }

  // //create a square with value passed to machine
  // let win = false;
  // function Square(props: SquareProps) {
  //   // if having winner => change styling of winning squares
  //   if (
  //     props.winningLine &&
  //     service.state.context.winning.includes(props.value)
  //   ) {
  //     // console.log(props.value);
  //     win = true;
  //     return (
  //       <button id="winSquare" className={`${styles.squareHighLight}`}>
  //         {service.state.context.board[props.value]}
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button
  //         className={styles.square}
  //         id="button"
  //         onClick={() => {
  //           service.send("PLAY", { value: props.value });
  //         }}
  //       >
  //         {service.state.context.board[props.value]}
  //       </button>
  //     );
  //   }
  // }

  // const renderBoard = range(0, 9).map((i) => {
  //   return (
  //     <Square
  //       key={i}
  //       value={i}
  //       winningLine={service.state.context.winner != ""}
  //     />
  //   );
  // });

  //main page
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.main}>
  //       <div className={styles.title}>Tic Tac Toe</div>
  //       {/* {service.state.context.size == 0 && (
  //         <div>
  //           <p>
  //             Choose size board:
  //             <select id="select1">
  //               <option value="3">3x3</option>
  //               <option value="5">5x5</option>
  //             </select>
  //             <button onClick={handleSelectSizeBoard}>Done</button>
  //           </p>
  //         </div>
  //       )} */}
  //       {/* <div>{renderTitle()}</div> */}
  //       <div className={styles.wrapper}>
  //         {/* {current.context.winner != "" && (
  //           <div className={styles.svg}>
  //             <svg
  //               className={styles.svg}
  //               viewBox="0 0 500 500"
  //               preserveAspectRatio="xMidYMid slice"
  //             >
  //               <line
  //                 className={styles.lineHorizontal}
  //                 x1={x1}
  //                 y1={y1}
  //                 x2={x2}
  //                 y2={y2}
  //               />
  //             </svg>
  //           </div>
  //         )} */}

  //         {/* <div className={styles.boardGrid}>{renderBoard}</div> */}
  //       </div>

  //       <div>
  //         <button
  //           className={styles.resetButton}
  //           // onClick={handleReset}
  //         >
  //           Reset
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default ticTacToeContainer;

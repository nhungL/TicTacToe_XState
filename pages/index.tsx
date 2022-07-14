import type { NextPage } from "next";
import React from "react";
import { useInterpret } from "@xstate/react";
import {
  ticTacToeMachine,
  ticTacToeModelContext,
  TTTContext,
} from "../machines/ticTacToeMachine";
import TicTacToe from "../component/main/ticTacToe";

const ticTacToeContainer: NextPage = () => {
  const authService = useInterpret(ticTacToeMachine, {
    context: ticTacToeModelContext,
  }).onTransition((state) => {
    if (state.matches("playing")) {
      console.log("SUCCESS!");
    }
  });

  return (
    <div>
      <TTTContext.Provider value={{ service: authService }}>
        <TicTacToe />
      </TTTContext.Provider>
    </div>
  );
};
export default ticTacToeContainer;

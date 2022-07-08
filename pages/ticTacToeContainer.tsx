import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { useInterpret } from "@xstate/react";
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
import TicTacToe from "../component/ticTacToe";

const ticTacToeContainer: NextPage = () => {
  const authService = useInterpret(ticTacToeMachine, {
    context: ticTacToeModelContext,
  }).onTransition((state) => {
    console.log(state.value)
    if (state.matches("playing")){
      console.log("SUCCESS!");
    }
  });
  console.log(authService)

  return (
    <div>
      <TTTContext.Provider value={{ service: authService }}>
        <TicTacToe />
      </TTTContext.Provider>
    </div>
  );
};
export default ticTacToeContainer;

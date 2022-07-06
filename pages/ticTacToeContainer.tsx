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

const ticTacToeContainer: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const authService = useInterpret(ticTacToeMachine, {
    context: ticTacToeModelContext,
  });
  console.log(authService)
  // authService.start();
  // const { service } = useContext(ticTacToeModelContext)
  // const { send: dispatch } = authService;
  // const boardSize = useSelector(authService, (state) => {
  //   return state.context.size;
  // });
  // console.log(boardSize);
  // console.log(size);

  return (
    <div>
      <TTTContext.Provider value={{ service: authService }}>
        <TicTacToe />
      </TTTContext.Provider>
    </div>
  );
};
export default ticTacToeContainer;

import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import * as helper from "../../helper/mainFunctions";
import styled from "styled-components";
import { Square } from "../square/square";

const StyledBoard = styled.div<{ size: number }>`
  display: grid;
  height: 50vmin;
  width: 50vmin;
  box-shadow:inset 0 0 0 2000px #d2beb01f;
  ${(props) => {
    if (props.size == 3)
      return `
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);`;
    if (props.size == 5)
      return `
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(5, 1fr);`;
  }};
`;

export const Board = () => {
  const { service } = useContext(TTTContext);
  const board = useSelector(service, (state) => {
    return state.context.board;
  });
  const boardSizeSelector = (state: any) => state.context.board.length;
  const boardSize = useSelector(service, boardSizeSelector);
  const winningLine = useSelector(service, (state) => {
    return state.context.winning;
  });
  const winningLines = useSelector(service, (state) => {
    return state.context.winningLines;
  });
  const size = useSelector(service, (state) => {
    return state.context.size;
  });

  const renderBoard = helper.range(0, boardSize).map((i) => {
    return (
      <Square
        key={i}
        value={i}
        hasWon={winningLine.includes(i)}
        winningLines={winningLines}
        size={size}
      />
    );
  });
  return <StyledBoard size={size}>{renderBoard}</StyledBoard>;
};

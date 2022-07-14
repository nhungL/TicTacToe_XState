import { containWin, generateWinningLines } from "../../helper/mainFunctions";
import styled from "styled-components";
import { useContext } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { useSelector } from "@xstate/react";

const Rotate = styled.hr<{ id: string }>`
  color: #680000;
  border-radius: 10rem;
  box-shadow: 0 0 0 2px #680000;
  // border-top: 0.3rem solid;
  position: absolute;
  margin: 0;
  ${(props) => {
    if (props.id == "0") return `transform: rotate(0deg); width: 35%;`;
    if (props.id == "90") return `transform: rotate(90deg); width: 35%;`;
    if (props.id == "45") return `transform: rotate(45deg); width: 50%;`;
    if (props.id == "135") return `transform: rotate(135deg); width: 50%;`;
  }};
`;

export const WinningLine = () => {
  const { service } = useContext(TTTContext);
  const winningLine = useSelector(service, (state) => {
    return state.context.winning;
  });
  const boardSizeSelector = (state: any) => state.context.size;
  const boardSize = useSelector(service, boardSizeSelector);
  let [res, horizontalWin, verticalWin, diagonalWin45, diagonalWin135] = generateWinningLines(boardSize);
  if (containWin(horizontalWin, winningLine)) {
    return <Rotate id="0" />;
  }
  if (containWin(verticalWin, winningLine)) {
    return <Rotate id="90" />;
  }
  if (containWin(diagonalWin45, winningLine)) {
    return <Rotate id="45" />;
  }
  if (containWin(diagonalWin135, winningLine)) {
    return <Rotate id="135" />;
  }
  return <Rotate id="0" />;
};

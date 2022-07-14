import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { WinningLine } from "../win/winningLine";
import { StyledSquare } from "./styles";

//variables in square
interface SquareProps {
  value: number;
  hasWon: boolean;
  winningLines: any[][];
  size: number;
}

//create a square with value passed to machine
export const Square = (props: SquareProps) => {
  const { service } = useContext(TTTContext);
  const board = useSelector(service, (state) => {
    return state.context.board;
  });

  // check winner
  if (props.hasWon) {
    return (
      <StyledSquare size={props.size} id="winSquare">
        <WinningLine />
        {board[props.value]}
      </StyledSquare>
    );
  } else {
    return (
      <StyledSquare
        size={props.size}
        id="normalButton"
        onClick={() => {
          service.send("PLAY", { value: props.value });
        }}
      >
        {board[props.value]}
      </StyledSquare>
    );
  }
};

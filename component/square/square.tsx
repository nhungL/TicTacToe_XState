import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import * as helper from "../../helper/mainFunctions";
import { WinningLine } from "../winningLine";
import { StyledButton } from "./styles";

//variables in square
interface SquareProps {
  value: number;
  win: boolean;
  winningLines: any[][];
  size: number;
}

//create a square with value passed to machine
export const Square = (props: SquareProps) => {
  const { service } = useContext(TTTContext);
  const board = useSelector(service, (state) => {
    return state.context.board;
  });
  const playerSelector = (state: any) => state.context.player;
  const player = useSelector(service, playerSelector);

  function normalSquare(props: SquareProps) {
    return (
      <StyledButton
        size={props.size}
        id="normalButton"
        onClick={() => {
          service.send("PLAY", { value: props.value });
        }}
      >
        {board[props.value]}
      </StyledButton>
    );
  }

  // check winner
  if (props.win) {
    return (
      <StyledButton size={props.size} id="winSquare">
        <WinningLine />
        {board[props.value]}
      </StyledButton>
    );
  } else {
    // Player X
    if (player == "X") {
      let value = helper.bestMove(board, props.winningLines);
      //update board with index chosen from bestMove();
      if (props.value == value) {
        service.send("PLAY", { value: value });
        return (
          <StyledButton size={props.size} id="normalButton">{board[props.value]}</StyledButton>
        );
      }
      return normalSquare(props);
    } else {
      // player O
      return normalSquare(props);
    }
  }
};

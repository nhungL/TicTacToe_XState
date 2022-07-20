import { useContext, useEffect, useState } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { StyledInput, StyledWaitingPlayout } from "./styles";

export const WaitingLayout = () => {
  const { service } = useContext(TTTContext);
  const [error, setError] = useState(false);
  const [size, setSize] = useState(0);

  function assignSize(value: number) {
    setSize(value);
  }

  const handleSelectBoardSize = () => {
    if (size == 0) {
      setError(true);
    } else {
      setError(false);
      console.log(size);
      console.log("size chosen", size);
      service.send("INITIALIZE", { value: size });
    }
  };

  return (
    <StyledWaitingPlayout>
      <div className="waiting">
        <p className="smallTitle">Choose a board size</p>
        <div className="display-select">
          <div className="select-wrap">
            <label className="label" htmlFor="3x3">
              3x3
            </label>
            <StyledInput
              type="button"
              value="3"
              id="3x3"
              onClick={() => assignSize(3)}
            ></StyledInput>
          </div>

          {/* <div className="select-wrap">
            <label className="label" htmlFor="5x5">
              5x5
            </label>
            <StyledInput
              type="button"
              value="5"
              id="5x5"
              onClick={() => assignSize(5)}
            ></StyledInput>
          </div> */}
        </div>
        <br />
        <div>
          <button className="playButton" onClick={handleSelectBoardSize}>
            PLAY
          </button>
          {error && (
            <div className="error">
              <span className="textError">Board size is required!</span>
            </div>
          )}
        </div>
      </div>
    </StyledWaitingPlayout>
  );
};

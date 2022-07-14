import { useContext, useState } from "react";
import { TTTContext } from "../../machines/ticTacToeMachine";
import { StyledOption, StyledSelect, StyledWaitingPlayout } from "./styles";

export const WaitingLayout = () => {
  const { service } = useContext(TTTContext);
  const [error, setError] = useState(false);

  const handleSelectBoardSize = () => {
    if (typeof window !== "undefined") {
      var e = document.getElementById("select1") as HTMLSelectElement;
      if (e.value == "") {
        setError(true);
      } else {
        setError(false);
        var value = parseInt(e.value);
        console.log("size chosen", value);
        service.send("INITIALIZE", { value: value });
      }
    }
  };

  return (
    <StyledWaitingPlayout>
      <div className="smalltitle">
        <p className="smallTitle">Choose a board size</p>
        <div className="optionTitle">
          <p className="p">3x3</p>
          <p className="p">5x5</p>
        </div>
        <StyledSelect id="select1" multiple>
          <StyledOption
            value="3"
          ></StyledOption>
          <StyledOption
            value="5"
          ></StyledOption>
        </StyledSelect>
        <br />
        {error && (
          <div className="error">
            <span className="textError">Board size is required!</span>
          </div>
        )}
        <button className="playButton" onClick={handleSelectBoardSize}>
          PLAY
        </button>
      </div>
    </StyledWaitingPlayout>
  );
};

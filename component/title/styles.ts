import styled from "styled-components";

export const StyledInput = styled.input<{ value: string }>`
    content-visibility: hidden;
    border: #d7d7d7 solid 3px;
    border-radius: 5px;
    background-size: contain;
    -webkit-appearance: none;
    box-shadow:inset 0px -4px 20px 120px #8959362e;
    :focus {
        border: #680000 solid 5px ;
    }

    margin: 0 1rem;
    ${(props) => {
    if (props.value == "3") return `background-image: url("3x3board1.png");width: 250px;
    height: 250px;
  }`;
    if (props.value == "5") return `background-image: url("5x5board1.png"); width: 250px;
    height: 250px;
  }`;
  }};
`;

export const StyledWaitingPlayout = styled.div`
  @media only screen and (max-width: 740px) { 
    .display-select {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 1.5rem;
    }
    
    .select-wrap {
      background-color:transparent;
      display: flex;
      flex-direction: column;
      text-shadow: 0px 0px 2px #680000;
      align-items: center;
      margin-top: 2rem;
    }
  
    .smallTitle {
      font-size: 1.5rem;
      margin: 0.5rem;
      border-top: 2px solid #680000;
      border-bottom: 2px solid #680000;
      box-shadow: inset 0 0 20px 15px #89593654;
      }
    }
  }

  .display-select {
    display: flex;
    justify-content: center;
  }

  .select-wrap {
    background-color:transparent;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    text-shadow: 0px 0px 2px #680000;
  }

  .smallTitle {
    padding: 0 1rem;
    border-top: 2px solid #680000;
    border-bottom: 2px solid #680000;
    box-shadow: inset 0 0 20px 15px #89593654;
    }
  }

  .error {
    font-size: 1.5rem;
    border: 1px solid;
    border-radius: 0.5rem;
    margin: 1rem auto;
    padding: 10px 5px 10px 5px;
    box-shadow: inset 0 0 20px 19px #ae0505;
    border-color: #680000;
    justify-content: center;
    max-width: fit-content;
    min-width: 400px;
  }

  .textError {
    margin: 0 1rem;
  }

  .playButton {
    margin-top: 3rem;
    border-radius: 0.3rem;
    font-family: "Indie Flower", "Comic Sans";
    font-size: x-large;
    transition: all .15s linear 0s;
    position: relative;
    padding: 10px 10px;
    background-color: #8959361f;
    color: black;
    cursor: pointer;
  
    
    box-shadow: -3px 3px 4px 3px #680000;
    text-shadow: 0px 0px 1px #680000;
    
    &:hover {
      box-shadow: -3px 3px 4px 3px #680000;
      background-color: #8959364a;
    }
  }
  
  a.playButton { position: relative; }
  
  a:active.playButton {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(2px);
  }

  .waiting {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 3.5rem;
  }
`;
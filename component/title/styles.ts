import styled, { css } from "styled-components";

export const StyledOption = styled.option<{ value: string }>`
    width: 250px;
    height: 250px;
    font-size: 1.2em;
    margin: 0 1rem;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    border: #d7d7d7 solid 2px;
    border-radius: 5px;
    background-size: contain;
    box-shadow:inset 0 0 0 2000px #8959361f;
    :checked {
        border: #680000 solid 5px;
    }
    ${(props) => {
        if (props.value == "3") return `background-image: url("3x3board.png")`;
        if (props.value == "5") return `background-image: url("5x5board.png")`;
    }};
`;

export const StyledSelect = styled.select<{}>`
  font-size: 1.6rem;
  font-family: "Indie Flower", "Comic Sans";
  background-color: transparent;
  border: none;
  overflow: hidden;
  justify-content: space-between;
  height: 250px;
  :focus {
    outline: none;
  }
`;

export const StyledWaitingPlayout = styled.div`
  .smallTitle {
    font-size: 2rem;
    margin: 2rem;
    border-top: 2px solid #680000;
    border-bottom: 2px solid #680000;
    box-shadow: inset 0 0 20px 15px #8959361f;
    }
  }
  .p {
    margin: 0;
  }
  .optionTitle {
    font-size: 2rem;
    display: flex;
    flex: 1;
    justify-content: space-between;
    text-align: center;
    margin: 0 5.7rem;
    color: black;
    text-shadow: 0px 0px 1px #680000;
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
    
    box-shadow: -3px 3px 4px 3px #680000;
    text-shadow: 0px 0px 1px #680000;
    
    &:hover {
      top: 3px;
      left: -3px;
      box-shadow: -3px 3px 4px 3px #680000;
      
      &::after {
        top: 1px;
        left: -2px;
        width: 4px;
        height: 4px;
      }
      
      &::before {
        bottom: -2px;
        right: 1px;
        width: 4px;
        height: 4px;
      }
    }
    
    &::after {
      transition: all .15s linear 0s;
      content: '';
      position: absolute;
      top: 2px;
      left: -4px;
      width: 8px;
      height: 8px;
      background-color: #680000;
      transform: rotate(45deg);
      z-index: -1;
      
    }
    
    &::before {
      transition: all .15s linear 0s;
      content: '';
      position: absolute;
      bottom: -4px;
      right: 2px;
      width: 8px;
      height: 8px;
      background-color: #680000;
      transform: rotate(45deg);
      z-index: -1;
    }
  }
  
  a.playButton { position: relative; }
  
  a:active.playButton {
    top: 6px;
    left: -6px;
    box-shadow: none;
    
    &:before {
      bottom: 1px;
      right: 1px;
    }
    
    &:after {
      top: 1px;
      left: 1px;
    }
  }

  .smalltitle {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 3.5rem;
  }
`;
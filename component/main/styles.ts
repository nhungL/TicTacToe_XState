import styled from "styled-components";

export const TTTContainer = styled.div`

    padding: 0 2rem;
    display: flex;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    background-image: linear-gradient(
        90deg,
        transparent 79px,
        #abced4 79px,
        #abced4 81px,
        transparent 81px
    ),
    linear-gradient(#eee 0.1em, transparent 0.1em);
    background-size: 100% 1.2em;
  
    .main {
        min-height: 100vh;
        padding: 4rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1rem;
    }
    
    .mainContent {
        background-color: transparent;
        align-items: center;
        justify-content: center;
        text-align: center;
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 3rem 0;
    }

    @media only screen and (max-width: 740px) {
      div.title {
        margin: 0;
        line-height: 1.15;
        font-size: 3.5rem;
        color: black;
        text-shadow: -2px 1px 4px #680000;
      }
    }

    .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
        color: black;
        text-shadow: -2px 1px 4px #680000;
    }

    .wrapper {
        position: relative;
        box-shadow: 0px 0px 20px 20px #d2beb01f;
    }
    
    .subtitle {
        font-size: 2rem;
        margin-top: 0;
        text-shadow: 0px 0px 1px #680000;
    }
    
    .smalltitle {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 3.5rem;
        text-shadow: 0px 0px 0px #680000;
    }

    .error {
      border: 1px solid;
      border-radius: 0.5rem;
      margin-bottom: 10px; 
      padding: 10px 5px 10px 5px;
      box-shadow: inset 0 0 20px 12px #ae0505;
      border-color: #680000;
      justify-content: center;
      max-width: fit-content;
    }
    
    .play-again-button {
      margin: 3rem 0 0 0rem;
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
    
    a.play-again-button { position: relative; }
    
    a:active.play-again-button {
      background-color: #3e8e41;
      box-shadow: 0 5px #666;
      transform: translateY(2px);
    }

    .backButton {
      margin: 3rem 4rem 0 0;
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
    
    a.backButton { position: relative; }
    
    a:active.backButton {
      background-color: #3e8e41;
      box-shadow: 0 5px #666;
      transform: translateY(2px);
    }
`;
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

    .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
        color: black;
        text-shadow: -4px 2px 4px #680000;
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
    
    .resetButton {
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
      
      a.resetButton { position: relative; }
      
      a:active.resetButton {
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
`;
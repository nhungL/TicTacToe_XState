import styled from "styled-components";

export const StyledSquare = styled.button<{ size: number, id: string }>`
    ${(props) => {
        if (props.size == 3) {
            if (props.id == "normalButton") return `
                font-size: xxx-large;
                border: solid 1px black;
                background-color: transparent;
                font-family: cursive;
                padding: 0;
                
                :first-child,
                :nth-child(2),
                :nth-child(3) {
                    border-top: none;
                }
                
                :nth-child(1),
                :nth-child(4),
                :nth-child(7) {
                    border-left: none;
                }
                
                :nth-child(7),
                :nth-child(8),
                :nth-child(9) {
                    border-bottom: none;
                }
                
                :nth-child(3),
                :nth-child(6),
                :nth-child(9) {
                    border-right: none;
                }
            `;

            if (props.id == "winSquare") return `
                font-size: xxx-large;
                border: solid 1px black;
                background-color: transparent;
                font-family: cursive;
                animation: pulse 5s ;
                padding: 0;
                align-items: center;
                display: flex;
                justify-content: center;
                
                @keyframes pulse {
                    0% {
                    background-color: rgb(230, 93, 93);
                    }
                }

                :first-child,
                :nth-child(2),
                :nth-child(3) {
                    border-top: none;
                }
                
                :nth-child(1),
                :nth-child(4),
                :nth-child(7) {
                    border-left: none;
                }
                
                :nth-child(7),
                :nth-child(8),
                :nth-child(9) {
                    border-bottom: none;
                }
                
                :nth-child(3),
                :nth-child(6),
                :nth-child(9) {
                    border-right: none;
                }
            `;
        }
        if (props.size == 5) {
            if (props.id == "normalButton") return `
                font-size: xx-large;
                border: solid 1px black;
                background-color: transparent;
                font-family: cursive;
                padding: 0;
                
                :first-child,
                :nth-child(2),
                :nth-child(3),
                :nth-child(4),
                :nth-child(5) {
                    border-top: none;
                }
                
                :nth-child(1),
                :nth-child(6),
                :nth-child(11),
                :nth-child(16),
                :nth-child(21) {
                    border-left: none;
                }
                
                :nth-child(21),
                :nth-child(22),
                :nth-child(23),
                :nth-child(24),
                :nth-child(25) {
                    border-bottom: none;
                }
                
                :nth-child(5),
                :nth-child(10),
                :nth-child(15),
                :nth-child(20),
                :nth-child(25) {
                    border-right: none;
                }
            `;

            if (props.id == "winSquare") return `
                font-size: xx-large;
                border: solid 1px black;
                background-color: transparent;
                font-family: cursive;
                animation: pulse 5s ;
                padding: 0;
                align-items: center;
                display: flex;
                justify-content: center;
                
                @keyframes pulse {
                    0% {
                    background-color: rgb(230, 93, 93);
                    }
                }

                :first-child,
                :nth-child(2),
                :nth-child(3),
                :nth-child(4),
                :nth-child(5) {
                    border-top: none;
                }
                
                :nth-child(1),
                :nth-child(6),
                :nth-child(11),
                :nth-child(16),
                :nth-child(21) {
                    border-left: none;
                }
                
                :nth-child(21),
                :nth-child(22),
                :nth-child(23),
                :nth-child(24),
                :nth-child(25) {
                    border-bottom: none;
                }
                
                :nth-child(5),
                :nth-child(10),
                :nth-child(15),
                :nth-child(20),
                :nth-child(25) {
                    border-right: none;
                }
            `;
        }
    }};
`;
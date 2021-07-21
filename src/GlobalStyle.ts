import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 10px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;
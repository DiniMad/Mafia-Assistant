import {GlobalStyles as BaseStyles} from "twin.macro";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = () => {
    return (
        <>
            <BaseStyles/>
            <CustomStyles/>
        </>
    );
};

const CustomStyles = createGlobalStyle`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyles;
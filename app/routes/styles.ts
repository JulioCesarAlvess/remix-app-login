import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
        background-color: #F0F8FF;
    }

    body {
        font-family: 'Roboto', sans-serif;
        color: #4682B4;
    }
`;

export default GlobalStyle;

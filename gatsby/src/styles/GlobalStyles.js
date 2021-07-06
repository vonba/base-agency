import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './Variables';

const GlobalStyles = createGlobalStyle`
  :root {
    // Colours
    --black: #000000;

    // 12 column grid
    --col1: 8.33%;
    --col1Internal: 9.996%;
    --col2: 16.66%;
    --col3: 25%;
    --col4: 33.33%;
    --col5: 41.66%;
    --col6: 50%;
    --col7: 58.33%;
    --col8: 66.66%;
    --col9: 75%;
    --col10: 83.33%;
    --col11: 91.66%;
    --col12: 100%;

    // Fixed dimensions
    --navHeight: 3rem;
    --maxPageWidth: 1250px;

    // Font sizes
    --fsBody: 16px;
    --fsTitle1: 40px;
    --fsTitle2: 28px;

    @media (min-width: ${breakpoints.breakLg}) {
      --fsTitle1: 65px;
      --fsTitle2: 31px;
      --navHeight: 5rem;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;

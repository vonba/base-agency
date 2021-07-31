import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './Variables';

const GlobalStyles = createGlobalStyle`
  :root {
    // Colours
    --black: #000000;
    --white: #FFFFFF;

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
    --navHeight: 7rem;
    --maxPageWidth: 1250px;
    
    // Font sizes
    --fsSmall: 0.8rem; //8
    --fsBody: 1rem; //10
    --fsTitle2: 1.6rem; //12
    --fsTitle1: 1.8rem; //16

    @media (min-width: ${breakpoints.breakLg}) {
      --navHeight: 11rem;
    }
  }
  

  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--black);
    color: var(--white);
    font-size: var(--fsBody);
    line-height: 1.25;

    &.expanded {
      overflow: hidden;
    }
  }

  h1 {
    font-size: var(--fsTitle1);
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  
  h2, h3 {
    font-size: var(--fsTitle2);
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  
  p {
    margin: 0 0 0.5rem 0;
  }

  .buttonWrapper,
  .linkWrapper {
    text-align: center;
  }
  
  a {
    text-decoration: none;
    color: var(--white);
    border-bottom: 1px solid var(--white);
    transition: border-color 0.5s;

    &:hover {
      border-bottom-color: transparent;
    }

    &.cta {
      display: inline-block;
      border: 2px solid var(--white);
      padding: 1rem;
      text-align: center;
      text-transform: uppercase;
      transition: all 0.5s;

      &:hover {
        background-color: var(--white);
        color: var(--black);
      }
    }
  }
`;

export default GlobalStyles;

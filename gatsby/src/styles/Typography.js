import { createGlobalStyle } from 'styled-components';
// import someFont from '../assets/fonts/ACaslonPro-Regular.woff';

const Typography = createGlobalStyle`
  /* @font-face {
    font-family: 'Caslon';
    src: url(interpolate someFont here);
    font-style: normal;
  } */
  
  html {
    font-family: Helvetica, sans-serif;
    color: var(--black);
  }
`;

export default Typography;

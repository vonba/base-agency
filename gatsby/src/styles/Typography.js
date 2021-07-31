import { createGlobalStyle } from 'styled-components';
import chivoRegular from '../fonts/Chivo-Regular.woff';
import chivoLight from '../fonts/Chivo-Light.woff';
import chivoBold from '../fonts/Chivo-Bold.woff';

const Typography = createGlobalStyle`

  @font-face {
    font-family: 'Chivo';
    src: url(${chivoBold});
    font-style: normal;
    font-weight: 800;
  }

  @font-face {
    font-family: 'Chivo';
    src: url(${chivoRegular});
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'Chivo';
    src: url(${chivoLight});
    font-style: normal;
    font-weight: 300;
  }

  html {
    font-family: 'Chivo', sans-serif;
  }

  h1, h2, h3, h4 {
    font-weight: normal;
  }
`;

export default Typography;

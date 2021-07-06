import React from 'react';
import Layout from './src/components/Layout';
// import { LocaleProvider } from './src/components/LocaleContext';

// import './src/styles/some-style.css'; // if you like

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// export function wrapRootElement({ element }) {
//   return <LocaleProvider>{element}</LocaleProvider>;
// }

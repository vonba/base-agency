import React from 'react';
import styled from 'styled-components';
// import { graphql } from 'gatsby';
import Nav from './Nav';
import 'normalize.css'; // imported as dependency, see package.json
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

const ContentStyles = styled.main`
  padding-top: var(--navHeight);
`;

export default function Layout(props) {
  const { children, pageContext } = props;
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Nav />
      <ContentStyles className={`${pageContext.slug || ''}`}>
        {children}
      </ContentStyles>
    </>
  );
}

// Add fragments here if needed
// export const query = graphql`
//   fragment SiteSettingsFields on SanitySiteSettings {
//     instagram
//     facebook
//     twitter
//     _rawVaultLegend
//     _rawNewsletterLegend
//     contactCategories {
//       ...LocaleStringFields
//     }
//   }
// `;

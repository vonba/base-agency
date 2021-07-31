import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Nav from './Nav';
import 'normalize.css'; // imported as dependency, see package.json
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import { LocaleProvider } from './LocaleContext';
import { breakpoints } from '../styles/Variables';

const ContentStyles = styled.main`
  padding: calc(var(--navHeight) + 1rem) 2rem 2rem 2rem;
  /* padding: calc(var(--navHeight) + 1rem) var(--col1) 2rem var(--col1); */

  @media (min-width: ${breakpoints.breakLg}) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export default function Layout(props) {
  const { children, pageContext } = props;
  return (
    <>
      <LocaleProvider pageContext={pageContext}>
        <GlobalStyles />
        <Typography />
        <Nav className={`${pageContext.slug}`}/>
        <ContentStyles className={`${pageContext.slug || ''}`}>
          {children}
        </ContentStyles>
      </LocaleProvider>
    </>
  );
}

export const query = graphql`
  fragment LocaleStringFields on SanityLocaleString {
    _type
    en
    es
  }

  fragment LocaleBlockFields on SanityLocaleBlock {
    _type
    en {
      _key
      _type
      children {
        marks
        text
        _type
      }
    }
    es {
      _key
      _type
      children {
        marks
        text
        _type
      }
    }
  }
`

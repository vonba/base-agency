import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../styles/Variables';

const HeaderStyles = styled.h1`
  border-top: 1px solid var(--white);
  border-bottom: 1px solid var(--white);
  text-transform: lowercase;
  padding: 0.35em 0 0.45em 0;
  margin-bottom: 1.5em;
  
  @media (min-width: ${breakpoints.breakMd}) {
    margin-bottom: 1.5em;
    /* padding: 0.5em var(--col1); */
  }
`

export default function PageHeader({children, className}) {
  return <HeaderStyles className={className}>
    {children}
  </HeaderStyles>
}
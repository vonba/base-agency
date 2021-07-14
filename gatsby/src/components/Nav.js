import { Link } from 'gatsby';
import React, { useContext } from 'react'
import styled from 'styled-components'
import { tr } from '../utils/translations';
import LocaleContext from './LocaleContext';
import LocaleLink from './LocaleLink'

const NavStyles = styled.nav`
  position: fixed;
  width: 100%;
  height: var(--navHeight);
  background: white;
  border-bottom: 2px solid var(--black);
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    padding-right: 1em;
  }
  
  .logo {
    text-transform: uppercase;
    font-size: 2em;
    font-weight: bold;
    padding-right: 1em;
    
    a {
      color: pink;
    }
  }
  `;

const Nav = () => {
  const [locale] = useContext(LocaleContext);

  return <NavStyles>
    <div className="logo">
      <Link to="/">Base Agency</Link>
    </div>
    <ul>
      <li>
        <LocaleLink to="/past-projects" slugs={{es: 'proyectos-pasados'}}>
          {tr('titles', 'pastProjects', locale)}
        </LocaleLink>
      </li>
    </ul>
  </NavStyles>
}

export default Nav
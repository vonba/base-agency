import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components'

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
  return <NavStyles>
    <div className="logo">
      <Link to="/">Site Name</Link>
    </div>
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </ul>
  </NavStyles>
}

export default Nav
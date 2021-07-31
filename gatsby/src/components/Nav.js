import { Link } from 'gatsby';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { tr } from '../utils/translations';
import LocaleContext from './LocaleContext';
import LocaleLink from './LocaleLink'
import logo1 from '../images/base-agency-logo-1.png';
import logo2 from '../images/base-agency-logo-2.png';
import logo3 from '../images/base-agency-logo-3.png';
import { breakpoints } from '../styles/Variables';
// import menuIcon from '../images/Icon_Menu_White.svg';

const NavStyles = styled.nav`
  --stroke: 4px;
  position: fixed;
  z-index: 5;
  width: 100%;
  height: var(--navHeight);
  // Use this drop shadow if using a solid background
  /* box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.5); */
  // Nav background gradient
  background: linear-gradient(180deg, var(--black) 2rem, transparent 100%);
  padding: 2rem;

  @media (min-width: ${breakpoints.breakMd}) {
    background: linear-gradient(180deg, var(--black) 0%, transparent 100%);
    box-shadow: none;
  }

  @media (min-width: ${breakpoints.breakLg}) {
    --stroke: 6px;
    padding: 3rem 4rem 4rem 4rem;
  }
  
  ul {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    height: 0;
    list-style: none;
    padding: 2rem var(--col1);
    overflow: hidden;
    background: var(--black);
    opacity: 0;
    transition: opacity 0.5;
    text-transform: lowercase;
    font-size: var(--fsTitle2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  &.expanded ul {
    height: 100%;
    opacity: 1;
  }
  
  li {
    text-align: center;
    width: 100%;
    border-bottom: 3px solid var(--white);
    font-size: 2rem;
    margin: 0.5rem 0;
    max-width: 33rem;

    a {
      border: none;
      background: var(--black);
      padding: 0 0.25rem var(--stroke) 0.25rem;
      transform: translateY(16px);
      display: inline-block;
      transition: transform 0.5s;

      &:hover {
        transform: translateY(16px) scale(1.1);
      }
    }
    
    @media (min-width: ${breakpoints.breakMd}) {
      text-align: left;
      font-size: 3.5rem;
      margin-bottom: 2rem;
      
      a {
        transform: translateY(26px);

        &:hover {
          transform: translateY(26px) scale(1.1);
        }
      }

      &.whatsOn {
        text-align: right;
      }

      &.services {
        text-align: left;
      }

      &.pastProjects {
        text-align: center;
      }

      &.contact {
        margin-bottom: 4rem;
      }
    }
  }
  
  .logo {
    display: inline-block;
    padding-right: 1em;
    text-indent: -999em;
    background: transparent url("${logo3}") no-repeat left top;
    background-size: contain;
    width: var(--col8);
    height: 3rem;
    transition: opacity 0.5s;
    // TODO: add drop shadow - need to change graphic to svg
    // https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters/

    @media (min-width: ${breakpoints.breakMd}) {
      background-image: url("${logo1}");
      height: 4rem;
    }

    @media (min-width: ${breakpoints.breakLg}) {
      height: 6rem;
    }
  }
  &.expanded .logo {
    opacity: 0;
  }
  
  // Landing page logo variation for mobile
  @media (max-width: ${breakpoints.breakSm}) {
    &.null {
      --navHeight: 11rem;
      // Slightly more black in the gradient, since area is bigger
      background: linear-gradient(180deg, var(--black) 50%, transparent 100%);

      .logo {
        background-image: url("${logo2}");
        width: 100%;
        height: 33vh;
      }
    }
  }

  .toggleExpanded {
    background: transparent;
    width: 2rem;
    height: 1.5rem;
    position: absolute;
    right: 0;
    right: 2rem;
    top: 2rem;
    text-indent: -999em;
    border: none;
    transition: all 0.5s;
    border-bottom: var(--stroke) solid var(--white);
    padding: 0;
    transition: transform 0.5s;
    outline: none;
    cursor: pointer;

    &::after,
    &::before {
      display: block;
      content: '';
      width: 100%;
      height: var(--stroke);
      background: var(--white);
      position: absolute;
      top: 0;
      transition: all 0.5s;
    }

    &::after {
      top: 50%;
    }

    /* @media (min-width: ${breakpoints.breakMd}) {
      width: 3rem;
      height: 2.25rem;
    } */

    @media (min-width: ${breakpoints.breakLg}) {
      width: 3rem;
      height: 2.25rem;
      top: 3rem;
      right: 4rem;
    }

    @media (hover: hover) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  &.expanded .toggleExpanded {
    border-color: transparent;

    &::before {
      transform: rotate(-45deg);
      transform-origin: right;
    }

    &::after {
      transform: rotate(45deg);
      transform-origin: left;
      top: 0;
      left: 27%;
    }
  }

  .contactInfo {
    display: none; // Show only when expanded
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 1rem;
    width: 100%;
    font-size: var(--fsSmall);
    font-weight: 300;

    @media (min-width: ${breakpoints.breakMd}) {
      bottom: 2rem;
    }
  }
  &.expanded .contactInfo {
    display: block;
  }
`;

const Nav = ({className}) => {
  const [locale] = useContext(LocaleContext);
  const [expanded, setExpanded] = useState(false);

  const onNavigate = () => {
    setExpanded(false);
  }

  return <NavStyles className={`${className} ${expanded ? 'expanded' : ''}`}>
    <Link to="/" style={{border: 'none'}}>
      <div className="logo">
        Base Agency
      </div>
    </Link>
    <ul>
      <li className="whatsOn">
        <LocaleLink to="/" onNavigate={onNavigate}>
          {tr('titles', 'whatsOn', locale)}
        </LocaleLink>
      </li>
      <li className="services">
        <LocaleLink to="/services" slugs={{es: 'servicios'}} onNavigate={onNavigate}>
          {tr('titles', 'services', locale)}
        </LocaleLink>
      </li>
      <li className="pastProjects">
        <LocaleLink to="/past-projects" slugs={{es: 'proyectos-pasados'}} onNavigate={onNavigate}>
          {tr('titles', 'pastProjects', locale)}
        </LocaleLink>
      </li>
      <li className="contact">
        <LocaleLink to="/contact" slugs={{es: 'contacto'}} onNavigate={onNavigate}>
          {tr('titles', 'getInTouch', locale)}
        </LocaleLink>
      </li>
    </ul>

    <p className="contactInfo">
      Jalapa 30B, Roma Norte, Cuauhtémoc<br />
      Mexico City
    </p>

    <button
      type="button"
      className="toggleExpanded"
      onClick={() => {
        if (!expanded) document.body.classList.add('expanded');
        if (expanded) document.body.classList.remove('expanded');
        setExpanded(!expanded);
      }}
      title="Menu"
    >
      Menu
    </button>

  </NavStyles>
}

export default Nav
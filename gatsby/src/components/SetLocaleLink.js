import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import LocaleContext from './LocaleContext';

export default function SetLocaleLink({ to, children }) {
  const [locale, setLocale] = useContext(LocaleContext);
  const linkClass = to === locale ? 'active' : '';

  // TODO: make link to translation of current page
  return (
    <Link
      to={`/${to}`}
      className={linkClass}
      onClick={(e) => {
        e.preventDefault();
        document.body.classList.remove('expanded');
        setLocale(to);
        navigate(`/${to}`);
      }}
    >
      {children}
    </Link>
  );
}

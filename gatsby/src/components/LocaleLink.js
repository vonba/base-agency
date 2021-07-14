import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import LocaleContext from './LocaleContext';

export default function LocaleLink({
  to,
  slugs,
  children,
  onNavigate,
  className,
}) {
  const [locale, setLocale] = useContext(LocaleContext);
  const isAnchorLink = to.includes('#');
  let slug = to;
  if (slugs && Object.keys(slugs).includes(locale)) {
    slug = `/${slugs[locale]}`;
  }
  const href = locale ? `/${locale}${slug}` : slug;
  if (isAnchorLink) {
    return (
      <AnchorLink
        className={className}
        to={href}
        onAnchorLinkClick={() => {
          document.body.classList.remove('expanded');
          if (onNavigate) {
            onNavigate();
          }
        }}
      >
        {children}
      </AnchorLink>
    );
  }
  return (
    <Link
      className={className}
      to={href}
      onClick={(e) => {
        e.preventDefault();
        document.body.classList.remove('expanded');
        if (onNavigate) {
          onNavigate();
        }
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import metaImage from '../images/icon.png';

export default function Meta({ children, location, description, title, image }) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s – ${siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Favicons */}
      <link
        rel="icon"
        type="image/png"
        href={`${siteMetadata.siteUrl}/icon.png`}
      />
      {/* Meta tags */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={description || siteMetadata.description}
      />
      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta
        property="og:image"
        content={image || `${siteMetadata.siteUrl}${metaImage}`}
      />
      <meta
        property="og:title"
        content={title || siteMetadata.title}
        key="ogtitle"
      />
      <meta
        property="og:site_name"
        content={siteMetadata.title}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={description || siteMetadata.description}
        key="ogdesc"
      />
      {/* Allow additional tags to be inject on a per-page basis */}
      {children}
    </Helmet>
  );
}

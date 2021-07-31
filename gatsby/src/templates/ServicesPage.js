import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import localize from'../components/localize.jsx';
import Meta from '../components/Meta.js';
import PageHeader from '../components/PageHeader.js';
import styled from 'styled-components';
import LocaleBlock from '../components/LocaleBlock.js';
import StyImage from '../components/StyImage.js';
import LocaleContext from '../components/LocaleContext.js';
import { breakpoints } from '../styles/Variables.js';
import { tr } from '../utils/translations.js';

const ServicesPageStyles = styled.div` 
  .header {
    margin-bottom: 2rem;
  }

  .services {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;

    li {
      display: block;
      padding: 0.25em 0;
      font-size: var(--fsBody);

      @media (min-width: ${breakpoints.breakMd}) {
        /* white-space: nowrap; */
        display: inline-block;
        
        &::after {
          content: '—';
          display: inline-block;
          padding: 0 0.5rem;
        }
      }
    }
  }
  
  .text {
    font-weight: 300;
    margin-bottom: 2rem;
  }
  
  @media (min-width: ${breakpoints.breakMd}) {
    .content {
      display: grid;
      grid-template-columns: auto 33%;
      grid-gap: 2rem;

      .header {
        grid-column: 1 / span 2;
        width: 100%;
        order: 1;
      }
      
      .services {
        order: 2;
        grid-column-start: 1;
      }
            
      .image {
        order: 3;
        grid-column-start: 2;
        height: 20vw;
      }

      .text {
        order: 4;
        grid-column-start: 1;
      }
    }
  }

  @media (min-width: ${breakpoints.breakLg}) {
  .content {
    grid-template-columns: auto 30%;

    .services {
      order: 1;
      grid-column-start: 1;
      padding-right: 10%;
      align-self: flex-end;
      margin-bottom: 0;
      
      li {
        font-size: 1.25em;
        padding: 0;
      }
    }

    .image {
      order: 2;
      grid-column-start: 2;
      height: 18vw;
    }

    .header {
      grid-column: 1 / span 2;
      order: 3;
      margin: 1rem 0;
    }

    .text {
      order: 4;
      grid-column-start: 1;
      columns: 2;
      column-gap: 2rem;
    }
  }
}
`;

const ServicesPage = ({data}) => {
  const [locale] = useContext(LocaleContext);
  const {page} = data;
  if (!page) return null;

  return <ServicesPageStyles>
    <Meta 
      title={page.metaname}
      description={page.metaDescription}
      image={page.metaImage}
    />

    <div className="content">

      <PageHeader className="header">{page.name}</PageHeader>

      <ul className="services">
        {tr('lists', 'services', locale).map(service => <li>{service}</li>)}
      </ul>
      
      <div className="text">
        <LocaleBlock content={page.body} />
      </div>

      {page.metaImage && <StyImage 
        className="image"
        sanityImage={page.metaImage} 
        alt={page.name}
        width={800}
        height={500}
      />}
    </div>


  </ServicesPageStyles>
}

export default localize(ServicesPage);

export const query = graphql`
  query($pageId: String!) {
    page: sanityCustomPage(id: { eq: $pageId }) {
      id
      slug {
        ...LocaleStringFields
      }
      name {
        ...LocaleStringFields
      }
      metaname {
        ...LocaleStringFields
      }
      metaDescription {
        ...LocaleStringFields
      }
      metaImage {
        ...ImageWithPreview
      }
      body {
        ...LocaleBlockFields
      }
    }
  }
`;
import React from 'react'
import { graphql } from 'gatsby'
import localize from'../components/localize.jsx';
import Meta from '../components/Meta.js';
import PageHeader from '../components/PageHeader.js';
import styled from 'styled-components';
import LocaleBlock from '../components/LocaleBlock.js';
import StyImage from '../components/StyImage.js';
import { breakpoints } from '../styles/Variables.js';
// import LocaleContext from '../components/LocaleContext.js';

const ContactPageStyles = styled.div`
  .image {
    margin-bottom: 2rem;
  }

  .content {
    font-size: 1.25em;
    font-weight: 300;

    p {
      margin-bottom: 2rem;
    }

    @media (min-width: ${breakpoints.breakMd}) {
      margin-top: 4rem;
      display: grid;
      grid-template-columns: 15em auto;
      grid-gap: 4rem;
      
      .image {
        width: 15em;
        height: 15em;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
    }
  }
`;

const ContactPage = ({data}) => {
  // const [locale] = useContext(LocaleContext);
  const {page} = data;
  if (!page) return null;

  return <ContactPageStyles>
    <Meta 
      title={page.metaname}
      description={page.metaDescription}
      image={page.metaImage}
    />
    
    <PageHeader>{page.name}</PageHeader>
    
    <div className="content">
      {page.metaImage &&  <StyImage 
        className="image"
        sanityImage={page.metaImage} 
        alt={page.name}
        width={400}
        height={500}
      />}

      <div className="text">
        <LocaleBlock content={page.body} />
        
        <p>
          instagram<br />
          <a href="https://instagram.com/baseagency.mx" target="_blank" rel="noreferrer">
            @baseagency.mx
          </a>
        </p>
        
        <p>
          email<br />
          <a href="mailto:info@baseagency.com">
            info@baseagency.mx
          </a>
        </p>
      </div>
    </div>
  </ContactPageStyles>
}

export default localize(ContactPage);

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
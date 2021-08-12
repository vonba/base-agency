import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import LocaleContext from '../components/LocaleContext.js';
import localize from'../components/localize.jsx';
import { tr } from '../utils/translations.js';
import Meta from '../components/Meta.js';
import Event from '../components/Event.js';
import PageHeader from '../components/PageHeader.js';
import styled from 'styled-components';
import { breakpoints } from '../styles/Variables.js';
import BlockContent from '@sanity/block-content-to-react'
import LocaleLink from '../components/LocaleLink.js';

const EventsPageStyles = styled.div`
  .intro {
    font-weight: 300;
    margin: 6rem 0 4rem 0;
    /* text-align: justify; */
  }

  .socials {
    font-weight: 300;
    font-size: var(--fsSmall);

    .resource {
      display: block;
      padding-top: 1em;
    }
  }

  .cta {
    width: 100%;
    margin-bottom: 4rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .event {
    display: grid;
    grid-template-columns: 1fr;

    .image {
      order: 1;
    }

    header {
      order: 2;
    }

    .content {
      order: 3;
    }
  }

  // Tablet
  @media (min-width: ${breakpoints.breakMd}) {
    .intro {
      text-align: left;
    }

    .eventsWrapper {
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;
      
      .event {
        .image {
          height: calc((100vw - 6rem) / 2 / 2);
        }
      }
    }
  }

  // Desktop
  @media (min-width: ${breakpoints.breakLg}) {
    padding-left: 38%;
    padding-top: 10rem;
    /* padding-top: calc(50vh - var(--navHeight) - 1rem); */

    .header {
      padding-left: 4rem;
    }
    
    .eventsWrapper {
      display: block;
      
      .event {
        grid-template-columns: 40% auto;
        grid-template-rows: 1fr auto;
        padding-left: 4rem;

        header {
          order: 1;
          grid-row-start: 1;
          grid-row-end: 2;

          .title {
            margin-top: 0;
          }
        }

        .image {
          order: 2;
          grid-row-start: 1;
          height: 18vw;
          margin-bottom: 1rem;
        }
        
        .content {
          order: 3;
          grid-row-start: 2;
          grid-column-start: 2;

          p {
            text-align: right;
          }
        }

      }
    }

    .intro {
      position: fixed;
      left: 4rem;
      top: 7rem;
      font-size: var(--fsTitle2);
      width: 16em;
    }
    
    .socials {
      position: fixed;
      left: 4rem;
      bottom: 4rem;

      .resource {
        margin-right: 1rem;
        display: inline-block;
      }
    }

    .cta {
      width: auto;
      padding-left: 4rem;
      padding-right: 4rem;
      margin-bottom: 0;
    }

    .linkWrapper {
      text-align: right;
    }
  }
`;

const EventsPage = ({data}) => {
  const [locale] = useContext(LocaleContext);
  const { page, events } = data;
  if (!page) return null;


  return <EventsPageStyles>
    <Meta 
      title={page.metaname}
      description={page.metaDescription}
    />
    
    <div className="intro">
      <BlockContent blocks={page.body} />
    </div>

    <PageHeader className="header">{page.name}</PageHeader>

    <div className="eventsWrapper">
      {events.nodes.map(event => <Event key={event._id} className="event" event={event} /> )}      
    </div>

    <div className="linkWrapper">
      <LocaleLink
        to="/past-projects"
        slugs={{es: 'proyectos-pasados'}}
        className="cta"
      >
        {tr('cta', 'seePastProjects', locale)}
      </LocaleLink>
    </div>

    <div className="socials">
      {tr('cta', 'connectWithUs', locale)}<br />
      <span className="resource">
        ig <a href="https://instagram.com/baseagency.mx" target="_blank" rel="noreferrer">@baseagency.mx</a> 
      </span>
      <span className="resource">
        email <a href="mailto:info@baseagency.mx">info@baseagency.mx</a>
      </span>
    </div>
  </EventsPageStyles>
}

export default localize(EventsPage);

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
    
    events: allSanityEvent {
      nodes {
        _id
        title {
          ...LocaleStringFields
        }
        location {
          ...LocaleStringFields
        }
        date
        body {
          ...LocaleBlockFields
        }
        image {
          ...ImageWithPreview
        }
        gallery {
          images {
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;
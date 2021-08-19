import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components';
import StyImage from './StyImage.js';
import formatDate from '../utils/formatDate.js';
import { breakpoints } from '../styles/Variables.js';

const EventStyles = styled.article`
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 1fr;

  .title {
    font-size: var(--fsTitle2);
    margin: 0.5em 0;
  }
  
  .date {
    font-size: var(--fsBody);
  }
  
  .location {
    display: block;
    font-size: var(--fsBody);
    margin-top: 0.5em;
    /* font-weight: 300; */
  }
  
  .image {
    // Square images
    height: calc(100vw - 4rem);
  }

  p {
    font-weight: 300;
  }

  header {
    @media (min-width: ${breakpoints.breakLg}) {
      padding-right: 1rem;
    }
  }
`;

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}} = mark
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    },
    link: ({mark, children}) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      return blank ?
        <a href={href} target="_blank" rel="noopener">{children}</a>
        : <a href={href}>{children}</a>
    }
  }
}

export default function Event({event, className}) {

  // Blocks currently arrive without the markDefs field, so this needs to be added
  const fixedEventBody = event.body.map((block) => ({ ...block, markDefs: [] }));
  console.log(event.body)
  console.log(fixedEventBody)

  return <EventStyles className={className}>
    <header>
      <h2 className="title">
        {event.title}
        <div className="date">
          {formatDate(event.date)}
        </div>
      </h2>
      <div className="location">
        {event.location}<br />
        {event.time}
      </div>
    </header>

    {event.image && <StyImage 
      className="image"
      sanityImage={event.image} 
      alt={event.title}
      width={400}
      height={500}
    />}
    
    <div className="content">
      <BlockContent blocks={fixedEventBody} serializers={serializers} />
    </div>
  </EventStyles>
}
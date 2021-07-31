import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components';
import StyImage from './StyImage.js';
import formatDate from '../utils/formatDate.js';

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
`;

export default function Event({event, className}) {

  return <EventStyles className={className}>
    <header>
      <h2 className="title">
        {event.title}
        <div className="date">
          {formatDate(event.date)}
        </div>
      </h2>
      <div className="location">
        {event.location}
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
      <BlockContent blocks={event.body} />
    </div>
  </EventStyles>
}
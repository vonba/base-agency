import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components';
import { breakpoints } from '../styles/Variables.js';
import Gallery from './Gallery.js';

const ProjectStyles = styled.article`
  margin-bottom: 4rem;

  .title {
    font-size: var(--fsTitle2);
    text-transform: uppercase;
    margin: 0.5em 0;
  }
  
  .location {
    display: block;
    font-size: var(--fsBody);
    margin-top: 0.5em;
    font-weight: 300;
  }
  
  .image {
    // Square images
    height: calc(100vw - 4rem);
  }
  
  .gallery:not(.expanded) {
    .galleryImage {
      height: calc(100vw - 4rem);
    }
  }

  p {
    font-weight: 300;
  }

  @media (min-width: ${breakpoints.breakLg}) {
    margin-bottom: 0;
  }
`;

export default function Project({project, className}) {
  return <ProjectStyles className={className}>
    <header>
      {project.gallery && <Gallery
        className="gallery"
        images={project.gallery.images}
        autoplay={false}
        arrows={true}
      />}
      <h2 className="title">
        {project.title}
        <span className="location">
          {project.location}
        </span>
      </h2>
      <BlockContent blocks={project.body} />
    </header>
  </ProjectStyles>
}
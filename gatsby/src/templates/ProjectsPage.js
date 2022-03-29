import React from 'react'
import { graphql } from 'gatsby'
// import LocaleContext from '../components/LocaleContext.js';
import BlockContent from '@sanity/block-content-to-react'
import localize from'../components/localize.jsx';
import Meta from '../components/Meta.js';
import Project from '../components/Project.js';
import PageHeader from '../components/PageHeader.js';
import styled from 'styled-components';
import { breakpoints } from '../styles/Variables.js';

const ProjectsPageStyles = styled.div`
  --gapValue: calc((100vw - 7rem) / 6 / 2);

  .intro {
    margin-bottom: 2em;
    line-height: 1.5;
    
    @media (min-width: ${breakpoints.breakLg}) {
      // Make this paragraph slightly narrower than main logo
      width: calc(var(--col8) - 1em);
    }
  }

  .projectsWrapper {
    
    @media (min-width: ${breakpoints.breakLg}) {
      .row {
        display: grid;
        grid-template-columns: repeat(2, 18% 32%);
  
        .project {
          padding: 1rem;
          position: relative;
          border: 1px solid var(--white);
  
          &:not(:nth-child(4n - 3)) {
            border-left: none;
          }
  
          &:nth-child(2n) {
            // Create space underneath the wide ones of this row
            margin-bottom: var(--gapValue);
          }

          &:nth-child(3) {
            // Add the missing line on the left side,
            // forming the right border of the gap
            position: relative;
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: -1px;
              bottom: 0;
              background: var(--white);
              width: 1px;
              height: var(--gapValue);
            }            
          }

  
          .image {
            height: calc((100vw - 7rem) / 6); // 0.8 ratio
          }
          
          .gallery:not(.expanded) {
            .galleryImage {
              height: calc((100vw - 7rem) / 6); // 0.8 ratio
            }
          }
        }

        // Every second row
        &:nth-child(2n) {
          grid-template-columns: repeat(2, 32% 18% );

          .project {
            &:nth-child(2n) {
              // Push narrow ones of this row up towards the wide
              // ones of previous row
              margin-top: calc(-1 * var(--gapValue));
              
              // Avoid doubling border of the project above
              border-top: none;

              // Add the missing line on the left side,
              // forming the right border of the gap
              position: relative;
              &::before {
                content: '';
                display: block;
                position: absolute;
                left: -1px;
                top: 0;
                background: var(--white);
                width: 1px;
                height: var(--gapValue);
              }

            }
          }
        }

        // All rows except last
        &:not(:last-child) {
          &:nth-child(3) {
            // Avoid double up border between wide project
            // on row below
            border-bottom: none;
          }
        }
      }  
    }

  }
`;

const ProjectsPage = ({data}) => {
  // const [locale] = useContext(LocaleContext);
  const {page} = data;
  if (!page) return null;

  const projectPerRow = 4;
  let projectRows = [];
  while (data.projects.nodes.length > 0) { 
    projectRows.push(data.projects.nodes.splice(0, projectPerRow));
  }

  return <ProjectsPageStyles>
    <Meta 
      title={page.metaname}
      description={page.metaDescription}
    />

    <div className="intro">
      <BlockContent blocks={page.body} />
    </div>
    
    <PageHeader>{page.name}</PageHeader>
    
    <div className="projectsWrapper">

      {projectRows.map(
        (projects, index) => (
          <div key={`projectRow-${index}`} className="row">
            {projects.map(
              project => 
                <Project 
                    key={project._id} 
                    className="project" 
                    project={project} 
                />
              )}
          </div>
        )
      )}
      
    </div>
      {/* {projects.nodes.map(project => <Project key={project._id} className="project" project={project} /> )} */}
  </ProjectsPageStyles>
}

export default localize(ProjectsPage);

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

    projects: allSanityProject(sort: { fields: order }) {
      nodes {
        _id
        title {
          ...LocaleStringFields
        }
        location {
          ...LocaleStringFields
        }
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
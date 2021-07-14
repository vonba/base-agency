import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'
import localize from'../components/localize.jsx';
import { tr } from '../utils/translations.js';
import LocaleContext from '../components/LocaleContext.js';

const ProjectsPage = ({data}) => {
  const [locale] = useContext(LocaleContext);

  // Get yr data from data.nodes
  return <div>
    <h1>{tr('titles', 'pastProjects', locale)}</h1>
    
    {data.projects.nodes.map(project => <article key={project._id}>
      <header>
        <h2>{project.title}</h2>
        <BlockContent blocks={project._rawBody} />
      </header>
    </article>)}
  </div>
}

export default localize(ProjectsPage);

export const query = graphql`
  query {
    projects: allSanityProject {
      nodes {
        _id
        slug {
          current
        }
        title {
          ...LocaleStringFields
        }
        body {
          ...LocaleBlockFields
        }
      }
    }
  }
`;
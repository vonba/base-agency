import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'

export const query = graphql`
  query {
    posts: allSanityPost {
      nodes {
        _id
        title
        slug {
          current
        }
        _rawBody
      }
    }
  }
`;

const PostsPage = ({data}) => {
  // Get yr data from data.nodes
  return <div>
    <h1>Posts</h1>
    {data.posts.nodes.map(post => <article key={post._id}>
      <header>
        <h2>{post.title}</h2>
        <BlockContent blocks={post._rawBody} />
      </header>
    </article>)}
  </div>
}

export default PostsPage
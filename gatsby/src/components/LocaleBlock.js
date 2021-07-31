import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
// import Img from 'gatsby-image';
// import { getFluidGatsbyImage } from 'gatsby-source-sanity';

// Sanity client config
// const sanityConfig = {
//   projectId: process.env.GATSBY_SANITY_PROJECT_ID,
//   dataset: process.env.GATSBY_SANITY_DATASET,
// };

// Create Sanity image url builder
// https://www.sanity.io/docs/image-url
// import imageUrlBuilder from '@sanity/image-url';
// const builder = imageUrlBuilder(clientConfig.sanity);
// // Create image object for manipulation
// function getImageObj(source = { asset: {} }) {
//   const imageObj = {
//     asset: { _ref: source.asset._ref || source.asset._id },
//   };
//   if (source.crop) imageObj.crop = source.crop;
//   if (source.hotspot) imageObj.hotspot = source.hotspot;
//   return builder.image(imageObj);
// }

// BlockContent custom serializers
const serializers = {
  marks: {
    sup: ({ children }) => <sup>{children}</sup>,
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
  },
  types: {
    // TODO: implement images with StyImage component
    // imageWithAlt: ({ node }) => {
    //   const fluidProps = getFluidGatsbyImage(
    //     node.asset._ref,
    //     { maxWidth: 2400 },
    //     sanityConfig
    //   );
    //   return <Img key={node._key} fluid={fluidProps} alt={node.alt} />;
    // },
  },
};

export default function LocaleBlock({ content, className }) {
  if (!content) {
    return <></>;
  }

  console.log({content})

  // Blocks currently arrive without the markDefs field, so this needs to be added
  const fixedContent = content.map((block) => ({ ...block, markDefs: [] }));
  // Check for class name
  const blockClass = content[0].className || '';

  return (
    <div className={`block ${className || ''} ${blockClass}`}>
      <BlockContent
        className="wrapper"
        blocks={fixedContent}
        serializers={serializers}
        projectId={process.env.GATSBY_SANITY_PROJECT_ID}
        dataset={process.env.GATSBY_SANITY_DATASET}
      />
    </div>
  );
}

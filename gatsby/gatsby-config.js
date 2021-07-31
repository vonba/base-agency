import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

module.exports = {
  // npm run build -- --prefix-paths
  pathPrefix: '/project/gatsby/public/',
  siteMetadata: {
    title: "Base",
    siteUrl: "https://baseagency.mx",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      watchMode: true,
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        // Hot reloading data
        watchMode: true,
        // Get token from .env file
        token: process.env.SANITY_TOKEN,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: "9pxhc8ad",
        dataset: "production",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

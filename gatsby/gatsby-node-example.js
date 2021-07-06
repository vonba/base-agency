import path from 'path';

const imageMaxWidth = 2400;

const defaultLanguage = 'en';
const languages = ['en', 'es'];

const createLocalePage = (page, createPage) => {
  const { context, ...rest } = page;

  languages.forEach((lang) => {
    const { path } = page;
    const linkPrefix = lang === defaultLanguage ? '' : lang;
    const urlPrefix = linkPrefix ? '/' : '';
    createPage({
      ...rest,
      path: `${urlPrefix}${linkPrefix}${path}`,
      context: {
        ...context,
        imageMaxWidth,
        locale: lang,
        linkPrefix,
      },
    });
  });
};

// Page creation hook (use localization wrapper here)
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  createLocalePage(page, createPage);
};

async function createGeneralPages({ graphql, actions }) {
  // 1. get a template for this page
  const pageTemplate = path.resolve('./src/templates/Page.js');

  // 2. query all pages
  const { data } = await graphql(`
    query {
      pages: allSanityGeneralPage {
        nodes {
          id
          slug {
            _type
            en
            es
          }
        }
      }
    }
  `);

  // 3. Create each page
  data.pages.nodes.forEach((page) => {
    console.log(`creating dynamic page for ${page.slug.en}`);

    languages.forEach((lang) => {
      const urlPrefix = lang === defaultLanguage ? '' : `/${lang}`;
      const linkPrefix = lang === defaultLanguage ? '' : lang;

      actions.createPage({
        path: `${urlPrefix}/${page.slug[lang]}`,
        // The template to use when creating this page
        component: pageTemplate,
        context: {
          pageId: page.id,
          slug: page.slug[lang],
          locale: lang,
          linkPrefix,
          imageMaxWidth,
          pageType: 'general',
        },
      });
    });
  });
}

async function createPropertyPages({ graphql, actions }) {
  // 1. get a template for this page
  const pageTemplate = path.resolve('./src/templates/PropertyPage.js');

  // 2. query all pages
  const { data } = await graphql(`
    query {
      pages: allSanityPropertyType {
        nodes {
          id
          slug {
            _type
            en
            es
          }
        }
      }
    }
  `);

  // 3. Create each page
  data.pages.nodes.forEach((page) => {
    console.log(`creating property page for ${page.slug.en}`);

    const { context, ...rest } = page;

    languages.forEach((lang) => {
      const urlPrefix = lang === defaultLanguage ? '' : `/${lang}`;
      const linkPrefix = lang === defaultLanguage ? '' : lang;

      actions.createPage({
        path: `${urlPrefix}/${page.slug[lang]}`,
        // The template to use when creating this page
        component: pageTemplate,
        context: {
          ...context,
          pageId: page.id,
          slug: page.slug[lang],
          locale: lang,
          linkPrefix,
          imageMaxWidth,
          pageType: 'property',
        },
      });
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically (and concurrently! speeds up build)
  await Promise.all([
    // General pages
    createGeneralPages(params),
    createPropertyPages(params),
  ]);
}

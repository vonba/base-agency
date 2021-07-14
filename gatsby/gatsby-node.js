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

// Create pages from /pages folder
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  createLocalePage(page, createPage);
};

// Create custom pages from pages stored in Sanity
async function createCustomPages({ graphql, actions }) {
  // query all pages
  const { data } = await graphql(`
    query {
      pages: allSanityCustomPage {
        nodes {
          id
          componentName
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
    // get dynamic template
    const pageTemplate = path.resolve(`./src/templates/${page.componentName}`);

    console.log(
      `creating dynamic page for ${page.slug.en} using component ${page.componentName}`
    );

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
          pageType: 'custom',
        },
      });
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically (and concurrently! speeds up build)
  await Promise.all([
    // Custom pages
    createCustomPages(params),
  ]);
}

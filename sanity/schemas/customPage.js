import metaFields from './metaFields';

export default {
  name: 'customPage',
  title: 'Custom pages',
  type: 'document',
  preview: {
    select: {
      title: 'name',
    },
    prepare: (fields) => {
      const { title } = fields;
      return {
        title: title?.en ? title.en : '(Untitled page)',
      };
    },
  },
  fieldsets: [
    {
      name: 'meta',
      title: 'META DATA',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: 'TITLE',
      name: 'name',
      type: 'localeString',
    },
    {
      title: 'MAIN BODY',
      name: 'body',
      type: 'localeBlock',
    },
    {
      title: 'TEMPLATE',
      description: "E.g. 'myCustomTemplate.js'",
      name: 'componentName',
      type: 'string',
    },
    ...metaFields,
  ],
};

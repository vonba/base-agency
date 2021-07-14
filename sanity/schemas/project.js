export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Main image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      title: 'Body',
      name: 'body',
      type: 'localeBlock',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: (fields) => {
      const { title } = fields;
      return {
        title: title.en,
      };
    },
  },
}

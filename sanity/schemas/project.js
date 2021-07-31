export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
    prepare: (fields) => {
      const { title } = fields;
      return {
        title: title?.en ? title.en : '(Untitled)',
      };
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Location/subheader',
      name: 'location',
      type: 'localeString',
    },
    {
      title: 'Details',
      name: 'body',
      type: 'localeBlock',
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
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
}

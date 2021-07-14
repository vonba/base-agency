export default {
  title: 'Gallery',
  name: 'gallery',
  type: 'object',
  preview: {
    select: {
      className: 'className',
    },
    prepare: (fields) => {
      const { className } = fields;
      return {
        title: `IMAGE GALLERY (${className})`,
      };
    },
  },
  fields: [
    {
      title: 'Class Name',
      name: 'className',
      type: 'string',
    },
    {
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
  ],
};

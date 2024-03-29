export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'localeString',
    },
    {
      title: 'Date',
      description: 'Date and time when this event should disappear from listing',
      name: 'date',
      type: 'datetime',
    },
    {
      title: 'Time',
      name: 'time',
      type: 'string',
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

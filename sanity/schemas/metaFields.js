export default [
  {
    title: 'SLUG',
    name: 'slug',
    type: 'localeString',
    fieldset: 'meta',
  },
  {
    title: 'CLASS NAME',
    name: 'className',
    type: 'string',
    fieldset: 'meta',
  },
  {
    title: 'META TITLE',
    name: 'metaname',
    description: 'This text is used as the document and Open Graph titles',
    type: 'localeString',
    fieldset: 'meta',
  },
  {
    title: 'META DESCRIPTION',
    name: 'metaDescription',
    description: 'This text is used for Open Graph and meta description tags',
    type: 'localeString',
    fieldset: 'meta',
  },
  {
    title: 'META IMAGE',
    description:
      'This image is used for Open Graph and for the journal preview carousel',
    name: 'metaImage',
    type: 'image',
    fieldset: 'meta',
  },
];

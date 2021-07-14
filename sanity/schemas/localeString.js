import React from 'react';

const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Spanish' },
  // Add as many languages as you need to support
];

const defaultLanguage = 'en';

const supRender = (props) => <sup>{props.children}</sup>;
const numRender = (props) => <span className="number">{props.children}</span>;

const localeString = {
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    placeholder: lang.title,
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
};

const blockFields = supportedLanguages.map((lang) => ({
  title: lang.title,
  name: lang.id,
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Superscript',
            value: 'sup',
            blockEditor: {
              icon: () => 'Sup',
              render: supRender,
            },
          },
          {
            title: 'Number',
            value: 'num',
            blockEditor: {
              icon: () => '9️⃣',
              render: numRender,
            },
          },
        ],
        annotations: [
          {
            title: 'Internal link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Page',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'generalPage' },
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    },
    { type: 'image' },
  ],
  fieldset: lang.isDefault ? null : 'translations',
}));

const localeBlock = {
  title: 'Text block',
  name: 'localeBlock',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      // Grab contents of default language for this block
      title: defaultLanguage,
    },
    prepare: (fields) => {
      const { title, className } = fields;
      return {
        // Use text of first block as name
        title: title[0].children ? title[0].children[0].text : '(block)',
      };
    },
  },
  fields: [
    ...blockFields,
    {
      title: 'Class Name',
      desciption:
        'e.g. center, large, quoteAlignLeft, imageLeft, imageRight, quoteLeft, quoteRight',
      name: 'className',
      type: 'string',
    },
  ],
};

export { localeString, localeBlock };

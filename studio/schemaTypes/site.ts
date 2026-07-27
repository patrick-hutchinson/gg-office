import {defineField, defineType} from 'sanity'

export const site = defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  initialValue: {
    title: 'GG-OFFICE',
    owner: 'GG-OFFICE',
    description: 'GG-OFFICE IS AN INDEPENDENT GRAPHIC AND MOTION AGENCY BASED IN SICILY.',
    themeColorsLight: {
      fontColorLight: '#000000',
      backgroundColorLight: '#ffffff',
    },
    themeColorsDark: {
      fontColorDark: '#ffffff',
      backgroundColorDark: '#000000',
    },
    defaultTheme: 'light',
  },

  fields: [
    defineField({
      name: 'title',
      title: 'Website Name',
      description: 'As seen on Google Search Results and Tab Bar',
      type: 'string',
    }),
    defineField({
      name: 'owner',
      title: 'Website Owner',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Website Description',
      type: 'string',
      description: 'As seen on Google Search Results (max. 160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'themeColorsLight',
      type: 'object',
      options: {columns: 2},
      fields: [
        defineField({
          name: 'fontColorLight',
          title: 'Font Color (Light)',
          description: 'Hex color used for links when light mode is active (example: #0050ff)',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
              name: 'hex color',
              invert: false,
            }),
        }),
        defineField({
          name: 'backgroundColorLight',
          title: 'Background Color (Light)',
          description: 'Hex color used for links when light mode is active (example: #66a3ff)',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
              name: 'hex color',
              invert: false,
            }),
        }),
      ],
    }),
    defineField({
      name: 'themeColorsDark',
      type: 'object',
      options: {columns: 2},
      fields: [
        defineField({
          name: 'fontColorDark',
          title: 'Font Color (Dark)',
          description: 'Hex color used for links when dark mode is active (example: #0050ff)',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
              name: 'hex color',
              invert: false,
            }),
        }),
        defineField({
          name: 'backgroundColorDark',
          title: 'Background Color (Dark)',
          description: 'Hex color used for links when dark mode is active (example: #66a3ff)',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
              name: 'hex color',
              invert: false,
            }),
        }),
      ],
    }),

    defineField({
      name: 'defaultTheme',
      title: 'Default Theme',
      description: 'Initial theme used when visitors first load the site',
      type: 'string',
      options: {
        list: [
          {title: 'System', value: 'system'},
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'system',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon Source Image',
      description:
        'Upload a square image (recommended 512x512 or larger). The site will generate all favicon sizes from this source.',
      type: 'image',
      options: {
        hotspot: false,
      },
    }),

    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site'}),
  },
})

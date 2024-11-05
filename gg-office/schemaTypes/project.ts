import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),

    defineField({name: 'coverimage', title: 'Cover Image', type: 'file'}),
    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'imagegallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {type: 'image'}, // Allows image uploads
        {type: 'file'}, // Allows file uploads
      ],
      options: {
        layout: 'grid', // The grid layout is maintained
      },
    }),
    defineField({
      name: 'gridStructure',
      title: 'Grid Structure',
      type: 'array',
      of: [
        {
          type: 'number',
          title: 'Number of images in row',
          validation: (Rule) =>
            Rule.min(1).max(3).error('You can select between 1 and 3 images per row.'),
        },
      ],
      description:
        'Define the number of images per row. Example: 2, 3, 1 means first row has 2 images, second row has 3, and third row has 1 image.',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'Art Direction', value: 'Art Direction'},
          {title: 'Brand Identity', value: 'Brand Identity'},
          {title: 'Editorial', value: 'Editorial'},
          {title: 'Illustration', value: 'Illustration'},
          {title: 'Logo', value: 'Logo'},
          {title: 'Motion Design', value: 'MotionDesign'},
          {title: 'Naming', value: 'Naming'},
          {title: 'Packaging', value: 'Packaging'},
          {title: 'Poster', value: 'Poster'},
          {title: 'Typography', value: 'Typography'},
          {title: 'Website', value: 'Website'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'creditsInhouse',
      title: 'Credits (GG-OFFICE)',
      type: 'object',
      fields: [
        defineField({
          name: 'directors',
          title: 'Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'creativedirectors',
          title: 'Creative Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'clientdirectors',
          title: 'Client Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'designers',
          title: 'Designer/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'artists3D',
          title: '3D Artist/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'photographers',
          title: 'Photographer/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
    defineField({
      name: 'creditsClient',
      title: 'Credits (Client)',
      type: 'object',
      fields: [
        defineField({
          name: 'clients',
          title: 'Client/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'directors',
          title: 'Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'creativedirectors',
          title: 'Creative Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'clientdirectors',
          title: 'Client Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'designers',
          title: 'Designer/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'artists3D',
          title: '3D Artist/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'photographers',
          title: 'Photographer/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
  ],
})

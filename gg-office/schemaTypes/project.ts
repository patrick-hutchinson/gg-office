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
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
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
      name: 'credits',
      title: 'Credits',
      type: 'object',
      fields: [
        defineField({
          name: 'client',
          title: 'Client/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'director',
          title: 'Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'creativeDirectors',
          title: 'Creative Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'clientDirectors',
          title: 'Client Director/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'Designer',
          title: 'Designer/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'Artist3D',
          title: '3D Artist/s',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'photography',
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

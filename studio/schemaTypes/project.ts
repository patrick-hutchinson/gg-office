import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {thumbnail} from './types/thumbnail'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'project', newItemPosition: 'after'}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
      description: 'As seen on home page',
    }),
    defineField({
      name: 'coverimage',
      title: 'Cover Image',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          hidden: ({parent}) => !!parent?.video,
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*', // restrict to videos only
          },
          hidden: ({parent}) => !!parent?.image,
        }),
      ],
      preview: {
        select: {
          image: 'image',
          video: 'video',
        },
        prepare({image, video}) {
          return {
            title: image ? 'Cover Image' : 'Cover Video',
            media: image || video,
          }
        },
      },
    }),
    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'imagegallery',
      title: 'Image & Video Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', hidden: ({parent}) => !!parent?.video},
            {name: 'video', type: 'mux.video', hidden: ({parent}) => !!parent?.image},
          ],
          preview: {
            select: {
              image: 'image',
              video: 'video',
            },
            prepare({image, video}) {
              return {
                title: image ? 'Image' : 'Video',
                media: image || video,
              }
            },
          },
        },
      ],
      options: {
        layout: 'grid',
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
            Rule.min(1).max(4).error('You can select between 1 and 4 images per row.'),
        },
      ],
      description:
        'Define the number of images per row. Example: 2, 3, 1 means first row has 2 images, second row has 3, and third row has 1 image.',
    }),
    defineField({
      name: 'filtering',
      title: 'Filtering',
      type: 'array', // Change to an array so multiple filters can be selected
      of: [{type: 'reference', to: [{type: 'filters'}]}],
      validation: (Rule) => Rule.unique().error('Each filter must be unique'),
      options: {
        // Enable multi-select (the default behavior for `array` type)
        layout: 'tags',
      },
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'role', title: 'Role', type: 'string'}),
            defineField({
              name: 'entries',
              title: 'Entries',
              type: 'array',
              of: [{type: 'string', name: 'entry'}],
            }),
          ],
          preview: {
            select: {
              title: 'role',
              entries: 'entries',
            },
            prepare({title, entries}) {
              return {
                title,
                subtitle: entries?.join(', '),
              }
            },
          },
        },
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
      validation: (Rule) => Rule.required(),
    }),
  ],
})

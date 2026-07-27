import {defineField, defineType} from 'sanity'

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
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
            {
              name: 'size',
              title: 'Media Size',
              type: 'string',
              options: {
                list: ['S', 'M', 'L'],
                layout: 'radio',
                direction: 'horizontal',
              },
            },
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
  ],
})

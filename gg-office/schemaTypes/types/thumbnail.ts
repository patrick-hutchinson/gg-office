import {defineType, defineField} from 'sanity'

export const thumbnail = defineType({
  name: 'thumbnail',
  title: 'Thumbnail',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      hidden: ({parent}) => parent?.type !== 'video',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      image: 'image',
      video: 'video',
    },
    prepare({type, image, video}) {
      return {
        title: type === 'image' ? 'Image Thumbnail' : 'Video Thumbnail',
        media: type === 'image' ? image : video,
      }
    },
  },
})

import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string', // You can leave this as is unless a more structured address format is needed
    }),
    defineField({name: 'googleMapsLink', title: 'Google Maps Link', type: 'string'}),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        },
      ],
    }),
  ],
})

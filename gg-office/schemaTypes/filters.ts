import {defineField, defineType} from 'sanity'

export const filters = defineType({
  name: 'filters',
  title: 'Filters',
  type: 'document',
  fields: [defineField({name: 'title', title: 'Title', type: 'string'})],
})

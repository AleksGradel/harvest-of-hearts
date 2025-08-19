import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'character',
  title: 'Character',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'loves',
      title: 'Loves',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    }),
    defineField({
      name: 'dislikes',
      title: 'Dislikes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    }),
    defineField({
      name: 'hates',
      title: 'Hates',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})

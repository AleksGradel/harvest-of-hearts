import {defineField, defineType} from 'sanity'

interface CharacterDoc {
  loves?: {_ref: string}[]
  likes?: {_ref: string}[]
  dislikes?: {_ref: string}[]
  hates?: {_ref: string}[]
}

export default defineType({
  name: 'character',
  title: 'Character',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'birthday', title: 'Birthday', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'loves',
      title: 'Loves',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      validation: (Rule) =>
        Rule.custom((items, context) => {
          if (!Array.isArray(items)) return true
          const doc = context.document as CharacterDoc
          const loves = items as {_ref: string}[]
          const allRefs = [...(doc.likes ?? []), ...(doc.dislikes ?? []), ...(doc.hates ?? [])]
          const conflict = loves.find((item) => allRefs.some((ref) => ref._ref === item._ref))
          return conflict ? `This item is already in another category (like/dislike/hate).` : true
        }),
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      validation: (Rule) =>
        Rule.custom((items, context) => {
          if (!Array.isArray(items)) return true
          const doc = context.document as CharacterDoc
          const likes = items as {_ref: string}[]
          const allRefs = [...(doc.loves ?? []), ...(doc.dislikes ?? []), ...(doc.hates ?? [])]
          const conflict = likes.find((item) => allRefs.some((ref) => ref._ref === item._ref))
          return conflict ? `This item is already in another category (love/dislike/hate).` : true
        }),
    }),
    defineField({
      name: 'dislikes',
      title: 'Dislikes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      validation: (Rule) =>
        Rule.custom((items, context) => {
          if (!Array.isArray(items)) return true
          const doc = context.document as CharacterDoc
          const dislikes = items as {_ref: string}[]
          const allRefs = [...(doc.loves ?? []), ...(doc.likes ?? []), ...(doc.hates ?? [])]
          const conflict = dislikes.find((item) => allRefs.some((ref) => ref._ref === item._ref))
          return conflict ? `This item is already in another category (love/like/hate).` : true
        }),
    }),
    defineField({
      name: 'hates',
      title: 'Hates',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      validation: (Rule) =>
        Rule.custom((items, context) => {
          if (!Array.isArray(items)) return true
          const doc = context.document as CharacterDoc
          const hates = items as {_ref: string}[]
          const allRefs = [...(doc.loves ?? []), ...(doc.likes ?? []), ...(doc.dislikes ?? [])]
          const conflict = hates.find((item) => allRefs.some((ref) => ref._ref === item._ref))
          return conflict ? `This item is already in another category (love/like/dislike).` : true
        }),
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

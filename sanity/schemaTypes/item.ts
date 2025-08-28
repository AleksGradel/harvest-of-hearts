import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 50),
      },
    }),
    defineField({name: 'imageUrl', title: 'Image URL', type: 'url'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Food', value: 'food'},
          {title: 'Artisan Good', value: 'artisan'},
          {title: 'Crop', value: 'crop'},
          {title: 'Crafting', value: 'crafting'},
          {title: 'Fish', value: 'fish'},
          {title: 'Mineral', value: 'mineral'},
          {title: 'Forage', value: 'forage'},
          {title: 'Animal Product', value: 'animal'},
          {title: 'Cooking', value: 'cooking'},
          {title: 'Cooking Ingredient', value: 'cooking-ingredient'},
          {title: 'Resource', value: 'resource'},
          {title: 'Trash', value: 'trash'},
          {title: 'Artifacts', value: 'artifacts'},
          {title: 'Trinkets', value: 'trinkets'},
          {title: 'Books', value: 'books'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
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

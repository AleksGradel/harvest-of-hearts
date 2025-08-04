import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
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
          {title: 'Fish', value: 'fish'},
          {title: 'Mineral', value: 'mineral'},
          {title: 'Forage', value: 'forage'},
          {title: 'Animal Product', value: 'animal'},
		  {title: 'Cooking', value: 'cooking'},
		  {title: 'Resource', value: 'resource'},
		  {title: 'Trash', value: 'trash'},
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

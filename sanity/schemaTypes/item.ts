import {defineField, defineType} from 'sanity'

export default defineType({
	name: 'item',
  	title: 'Item',
  	type: 'document',
	fields: [
		defineField({ name: 'name', title: 'Name', type: 'string' }),
		defineField({ name: 'image', title: 'Image', type: 'image' }),
		defineField({ name: 'category', title: 'Category', type: 'string' }),
		defineField({ name: 'description', title: 'Description', type: 'text' }),
	],
	preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
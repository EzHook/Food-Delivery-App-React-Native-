import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of dish',
      type: 'string',
      validation: (Rule)=> Rule.required()
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule)=> Rule.required(200)
    }),
    defineField({
      name: 'price',
      type: 'number',
      title:"Price of the dish"
    }),
    defineField({
      name: 'image',
      title: 'Image of the dish',
      type: 'image',
    }),
   ],
})

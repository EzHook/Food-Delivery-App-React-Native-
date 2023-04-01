import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Category',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title:"Featured Category name",
      validation: (Rule)=> Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title:"Short Description",
      validation: (Rule)=> Rule.required(200)
    },
    {
        name: "restaurants",
        type: "array",
        title: "Restaurants",
        of: [{ type : "reference", to : [{ type: "restaurants"}]}]
    }
  ],
})
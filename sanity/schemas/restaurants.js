import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'restaurants',
  title: 'Restaurants',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: (Rule)=>Rule.required(),
    },
    {
      name:"short_description",
      type:"string",
      title:"Short description",
      validation: (Rule)=>Rule.required(200),
    },
    {
      name:"image",
      type:"image",
      title:"Image of Restaraunt",
    },
    {
      name:"lat",
      type:"number",
      title:"Latitude of the Restaraunt",
    },
    {
      name:"long",
      type:"number",
      title:"Longitude of the Restaraunt",
    },
    {
      name:"address",
      type:"string",
      title:"Restaraunt address",
      validation: (Rule)=>Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a rating from 1 to 5 stars",
      validation: (Rule) =>
      Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a value between 1 to 5"),
    },
    {
      name:"type",
      title:"Category",
      validation: (Rule)=> Rule.required(),
      type: "reference",
      to: [{ type : "category"}]
    },
    {
      name: "dishes",
      type:"array",
      title:"Dishes",
      of: [{ type: "reference", to: [{ type : "dish"}] }]
    }
  ],
})

import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const crops = [
  { title: 'Original', value: 0 },
  { title: '1 : 1 (square)', value: 1 },
  { title: '4 : 6', value: 0.6666666667 },
  { title: '6 : 4', value: 1.5 },
  { title: '16 : 9', value: 1.7777777778 },
]

export default defineType({
  name: 'pbBlockImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageCrop',
      title: 'Aspect Ratio',
      type: 'number',
      options: {
        list: crops,
      },
      initialValue: 0,
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
    defineField({
      name: 'priority',
      title: 'High Priority Loading',
      type: 'boolean',
      description:
        'Enable for images above the fold to improve loading performance',
      initialValue: false,
    }),
  ],
})

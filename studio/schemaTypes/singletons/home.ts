import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialIcons',
      title: 'Social Icons',
      type: 'array',
      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
    defineField({
      name: 'footerQuote1',
      title: 'Footer Quote 1',
      type: 'string',
      initialValue: 'It is a common fault',
    }),
    defineField({
      name: 'footerQuote2',
      title: 'Footer Quote 2',
      type: 'string',
      initialValue: 'not to anticipate storms',
    }),
    defineField({
      name: 'footerQuote3',
      title: 'Footer Quote 3',
      type: 'string',
      initialValue: 'when the sea is calm',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})

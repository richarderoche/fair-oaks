import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Button',
  name: 'pbBlockButton',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      title: 'Button Text',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'enter an external URL',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title ?? url,
        subtitle: title && url,
        media: LaunchIcon,
      }
    },
  },
})

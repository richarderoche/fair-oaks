import {RemoveIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pbBlockDivider',
  title: 'Divider',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    defineField({
      title: 'Hide on Mobile?',
      name: 'hideOnMobile',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      hideOnMobile: 'hideOnMobile',
    },
    prepare(selection) {
      const {hideOnMobile} = selection
      return {
        title: 'Divider',
        subtitle: hideOnMobile ? 'Hide on Mobile' : 'Show on Mobile',
        media: RemoveIcon,
      }
    },
  },
})

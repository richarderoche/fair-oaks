import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Email Link',
  name: 'pbBlockEmail',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      title: 'Email Address',
      name: 'emailAddress',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      emailAddress: 'emailAddress',
    },
    prepare({emailAddress}) {
      return {
        title: 'Email Link',
        subtitle: emailAddress,
        media: EnvelopeIcon,
      }
    },
  },
})

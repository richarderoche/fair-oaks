import {FaceHappyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Social Media',
  name: 'pbBlockSocial',
  type: 'object',
  icon: FaceHappyIcon,
  fields: [
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Media',
        media: FaceHappyIcon,
      }
    },
  },
})

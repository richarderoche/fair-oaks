import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockText',
  title: 'Text',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({ name: 'textContent', title: 'Content', type: 'ptBasic' }),
  ],
  preview: {
    select: {
      content: 'textContent',
    },
    prepare({ content }) {
      return {
        title: 'Text',
        subtitle: content.length > 0 ? content[0].children[0]?.text : 'Empty',
      }
    },
  },
})

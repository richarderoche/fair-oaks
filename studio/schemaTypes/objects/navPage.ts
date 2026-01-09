import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Page',
  name: 'navPage',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      title: 'Title Override',
      name: 'title',
      type: 'string',
      description: 'Display Text',
    }),
    defineField({
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'project' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageTitle: 'page.title',
      pageType: 'page._type',
      pageSlug: 'page.slug.current',
    },
    prepare({ title, pageType, pageSlug, pageTitle }) {
      return {
        title: `${title || pageTitle}`,
        subtitle: `${pageType} / ${pageSlug}`,
      }
    },
  },
})

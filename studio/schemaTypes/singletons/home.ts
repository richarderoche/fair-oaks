import {HomeIcon, StackCompactIcon} from '@sanity/icons'
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
      name: 'homeIntroBig',
      title: 'Home Intro Big',
      type: 'ptSlim',
    }),
    defineField({
      name: 'homeIntroSmall',
      title: 'Home Intro Small',
      type: 'ptSlim',
    }),
    defineField({
      name: 'homeBgImageLandscape',
      title: 'Background Image - Landscape',
      description: 'Recommended ratio: 4:3',
      type: 'image',
    }),
    defineField({
      name: 'homeBgImagePortrait',
      title: 'Background Image - Portrait',
      description: 'Recommended ratio: 9:16',
      type: 'image',
    }),
    defineField({
      name: 'alt',
      title: 'Background Image Alt text',
      type: 'string',
      description: 'Describe the background image for accessibility compliance',
    }),
    defineField({
      title: 'Page Builder',
      name: 'pbSections',
      type: 'pbSections',
      icon: StackCompactIcon,
    }),
    defineField({
      name: 'footerQuote1',
      title: 'Footer Quote 1',
      type: 'string',
      initialValue: 'It is a common fault',
      description: 'Use a backslash to split the text into multiple lines.',
    }),
    defineField({
      name: 'footerQuote2',
      title: 'Footer Quote 2',
      type: 'string',
      initialValue: 'not to anticipate storms',
      description: 'Use a backslash to split the text into multiple lines.',
    }),
    defineField({
      name: 'footerQuote3',
      title: 'Footer Quote 3',
      type: 'string',
      initialValue: 'when the sea is calm',
      description: 'Use a backslash to split the text into multiple lines.',
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

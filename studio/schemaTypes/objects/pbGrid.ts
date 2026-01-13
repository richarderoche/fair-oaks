import {DashboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {getGridSettings, getTypeTitles} from '../../lib/utils'

const vList = [
  {title: 'Top', value: 'self-start'},
  {title: 'Middle', value: 'self-center'},
  {title: 'Bottom', value: 'self-end'},
]

export default defineType({
  title: 'Grid Section',
  name: 'pbGrid',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      title: 'Outer Settings',
      name: 'outerSettings',
      type: 'pbGridSettings',
      description: 'Relative to the full page in steps of 1/12th',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      title: 'Section Description (optional)',
      name: 'sectionName',
      type: 'string',
      description: 'For organizational purposes only.',
    }),
    defineField({
      title: 'Inner Columns',
      name: 'columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Column Settings',
              name: 'columnSettings',
              type: 'pbGridSettings',
              description: 'Relative to the parent grid in steps of 1/12th',
              options: {collapsible: true, collapsed: false},
            },
            {
              title: 'Vertical Alignment',
              name: 'yAlignment',
              type: 'object',
              options: {columns: 3, collapsible: true, collapsed: true},
              fields: [
                {
                  title: 'Mobile',
                  name: 'mobile',
                  type: 'string',
                  initialValue: 'self-start',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: vList,
                  },
                },
                {
                  title: 'Tablet',
                  name: 'tablet',
                  type: 'string',
                  initialValue: 'inherit',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: [{title: 'Inherit Mobile', value: 'inherit'}, ...vList],
                  },
                },
                {
                  title: 'Desktop',
                  name: 'desktop',
                  type: 'string',
                  initialValue: 'inherit',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: [{title: 'Inherit Tablet', value: 'inherit'}, ...vList],
                  },
                },
              ],
            },
            {
              title: 'Reveal Effect',
              name: 'revealEffect',
              type: 'string',
              options: {
                list: [
                  {title: 'None', value: 'none'},
                  {title: 'Fade In Up', value: 'fade-up'},
                  {title: 'Fade In Right', value: 'fade-right'},
                ],
              },
              initialValue: 'none',
            },
            {
              title: 'Column Blocks',
              name: 'pbBlocks',
              type: 'pbBlocks',
            },
          ],
          preview: {
            select: {
              columnSettings: 'columnSettings',
              columnBlocks: 'pbBlocks',
            },
            prepare({columnSettings, columnBlocks}) {
              const gridSettings = getGridSettings(columnSettings)
              const types = columnBlocks ? columnBlocks.map((block: any) => block._type) : []
              const blockList = getTypeTitles(types)
              return {
                title: gridSettings,
                subtitle: `Blocks: ${blockList || 'None'}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      outerSettings: 'outerSettings',
    },
    prepare({sectionName, outerSettings}) {
      const gridSettings = getGridSettings(outerSettings)
      return {
        title: sectionName ? `Grid Section: ${sectionName}` : 'Grid Section',
        subtitle: gridSettings,
        media: DashboardIcon,
      }
    },
  },
})

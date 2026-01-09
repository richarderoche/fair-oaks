import { defineType } from 'sanity'

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  // todo: hero, slider, marquee, section title/divider
  of: [{ type: 'pbGrid' }],
})

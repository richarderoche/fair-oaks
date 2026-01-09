import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes, singletonSchemaTypes } from './schemaTypes'
import { pageStructure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Fair Oaks',

  projectId: 'mzorz60q',
  dataset: 'production',

  scheduledPublishing: {
    enabled: false,
  },

  plugins: [// The order determines the order in the studio menu
    structureTool({
      structure: pageStructure(singletonSchemaTypes),
    }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

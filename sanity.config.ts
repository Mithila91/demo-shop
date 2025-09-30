import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Klarna Sparkle Shop - TechRescue CMS',
  
  projectId: 'qw2gnxbf',
  dataset: 'production',
  
  plugins: [
    structureTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio', // This will make the studio available at /studio route
})

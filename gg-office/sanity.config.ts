import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {muxInput} from 'sanity-plugin-mux-input'
import {thumbnail} from './schemaTypes/types/thumbnail'

export default defineConfig({
  name: 'default',
  title: 'gg-office',

  projectId: 'ghlrrzh3',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), muxInput()],

  schema: {
    types: [...schemaTypes, thumbnail],
  },
})

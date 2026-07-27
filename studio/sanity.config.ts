import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {muxInput} from 'sanity-plugin-mux-input'
import {thumbnail} from './schemaTypes/types/thumbnail'

const singletonTypes = new Set(['site'])

export default defineConfig({
  name: 'default',
  title: 'gg-office',

  projectId: 'ghlrrzh3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site')
              .schemaType('site')
              .child(S.document().schemaType('site').documentId('site')),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              (listItem) => !['project', 'site'].includes(listItem.getId() || ''),
            ),
          ]),
    }),
    muxInput(),
  ],

  schema: {
    types: [...schemaTypes, thumbnail],
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})

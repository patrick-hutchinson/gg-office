const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'ghlrrzh3',
  dataset: 'production',
  apiVersion: '2025-06-27',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const creditFields = [
  {key: 'clients', title: 'Client'},
  {key: 'directors', title: 'Direction'},
  {key: 'creativedirectors', title: 'Creative Director'},
  {key: 'clientdirectors', title: 'Project Manager'},
  {key: 'designers', title: 'Designer'},
  {key: 'artists3D', title: '3D Artist'},
  {key: 'photographers', title: 'Photography'},
]

const insertAdditionalAfter = 'creativedirectors'

const cleanText = (value) => (typeof value === 'string' ? value.trim() : '')

const cleanEntries = (entries) =>
  Array.isArray(entries) ? entries.map(cleanText).filter(Boolean) : []

const keyPart = (value) =>
  cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'credit'

const getCreditRows = (credits, group) => {
  if (!credits) return []

  return creditFields.flatMap(({key, title}) => {
    const rows = []
    const entries = cleanEntries(credits[key])

    if (entries.length > 0) {
      rows.push({
        _key: `${group}-${key}`,
        role: title,
        entries,
      })
    }

    if (key === insertAdditionalAfter && Array.isArray(credits.additionalCredits)) {
      credits.additionalCredits.forEach((credit, index) => {
        const role = cleanText(credit.role)
        const additionalEntries = cleanEntries(credit.people)

        if (role && additionalEntries.length > 0) {
          rows.push({
            _key: `${group}-additional-${keyPart(role)}-${index}`,
            role,
            entries: additionalEntries,
          })
        }
      })
    }

    return rows
  })
}

async function migrateProjectCredits() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error('SANITY_AUTH_TOKEN is required to migrate project credits.')
  }

  const projects = await client.fetch(`
    *[_type == "project" && (defined(creditsInhouse) || defined(creditsClient))]{
      _id,
      name,
      credits,
      creditsInhouse,
      creditsClient
    }
  `)

  if (projects.length === 0) {
    console.log('No legacy project credits found.')
    return
  }

  let migrated = 0

  for (const project of projects) {
    const credits = [
      ...getCreditRows(project.creditsInhouse, 'inhouse'),
      ...getCreditRows(project.creditsClient, 'client'),
    ]

    if (credits.length === 0) {
      continue
    }

    await client
      .patch(project._id)
      .set({credits})
      .unset(['creditsInhouse', 'creditsClient'])
      .commit()

    migrated += 1
    console.log(`${project.name || project._id}: migrated ${credits.length} credit rows`)
  }

  console.log(`Migrated credits for ${migrated} projects.`)
}

migrateProjectCredits().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

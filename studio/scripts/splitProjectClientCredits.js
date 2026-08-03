const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'ghlrrzh3',
  dataset: 'production',
  apiVersion: '2025-06-27',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const isClientCredit = (credit) => typeof credit?._key === 'string' && credit._key.startsWith('client-')

async function splitProjectClientCredits() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error('SANITY_AUTH_TOKEN is required to split project client credits.')
  }

  const projects = await client.fetch(`
    *[_type == "project" && defined(credits)]{
      _id,
      name,
      credits,
      creditsClient
    }
  `)

  if (projects.length === 0) {
    console.log('No project client credits need splitting.')
    return
  }

  let migrated = 0

  for (const project of projects) {
    const credits = Array.isArray(project.credits) ? project.credits : []
    const existingClientCredits = Array.isArray(project.creditsClient) ? project.creditsClient : []
    const inhouseCredits = credits.filter((credit) => !isClientCredit(credit))
    const clientCredits = credits.filter(isClientCredit)

    if (clientCredits.length === 0) continue

    const existingKeys = new Set(existingClientCredits.map((credit) => credit._key).filter(Boolean))
    const mergedClientCredits = [
      ...existingClientCredits,
      ...clientCredits.filter((credit) => !existingKeys.has(credit._key)),
    ]

    await client
      .patch(project._id)
      .set({
        credits: inhouseCredits,
        creditsClient: mergedClientCredits,
      })
      .commit()

    migrated += 1
    console.log(`${project.name || project._id}: moved ${clientCredits.length} client credit rows`)
  }

  console.log(`Split client credits for ${migrated} projects.`)
}

splitProjectClientCredits().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

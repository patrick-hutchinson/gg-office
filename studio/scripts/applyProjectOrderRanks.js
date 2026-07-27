const {createClient} = require('@sanity/client')
const {LexoRank} = require('lexorank')

const client = createClient({
  projectId: 'ghlrrzh3',
  dataset: 'production',
  apiVersion: '2025-06-27',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

async function applyProjectOrderRanks() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error('SANITY_AUTH_TOKEN is required to update project order ranks.')
  }

  const projects = await client.fetch(`
    *[_type == "project"]
      | order(defined(sortNumber) desc, sortOrder asc, _createdAt desc) {
        _id,
        name,
        sortOrder,
        _createdAt,
        orderRank
      }
  `)

  if (projects.length === 0) {
    console.log('No projects found.')
    return
  }

  let rank = LexoRank.min()
  const transaction = client.transaction()

  projects.forEach((project, index) => {
    rank = rank.genNext().genNext()
    const orderRank = rank.toString()

    transaction.patch(project._id, (patch) => patch.set({orderRank}))
    console.log(`${index + 1}. ${project.name || project._id} -> ${orderRank}`)
  })

  await transaction.commit()
  console.log(`Applied orderRank values to ${projects.length} projects.`)
}

applyProjectOrderRanks().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

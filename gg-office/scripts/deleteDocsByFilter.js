const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'ghlrrzh3',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token:
    'skQWLErvW02tHl72DgOWkGMA5tL6msqJ6QQzxHTFouyuZQh5KeO2BUduBDwsq8rwK105sUKcsfUfoVNkJlYmJIriwdBfFKwDx7cr70KbpskIdMB4k4oGqtf1Hxx5rkSn34EpFTTLTvggs09oq2oXKmlj38YIvhLiMY6dZbZafHm2acNEM1xw',
  useCdn: false,
})

async function clearImageGalleries() {
  const ids = await client.fetch(`*[_type == "project" && defined(imagegallery)][]._id`)
  for (const id of ids) {
    await client
      .patch(id)
      .unset(['imagegallery'])
      .commit()
      .then(() => console.log(`✅ Cleared imagegallery on ${id}`))
      .catch((err) => console.error(`❌ Failed on ${id}`, err))
  }
}

clearImageGalleries()

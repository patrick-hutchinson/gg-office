const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'ghlrrzh3',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token:
    'skQWLErvW02tHl72DgOWkGMA5tL6msqJ6QQzxHTFouyuZQh5KeO2BUduBDwsq8rwK105sUKcsfUfoVNkJlYmJIriwdBfFKwDx7cr70KbpskIdMB4k4oGqtf1Hxx5rkSn34EpFTTLTvggs09oq2oXKmlj38YIvhLiMY6dZbZafHm2acNEM1xw',
  useCdn: false,
})

async function deleteAllVideos() {
  try {
    // Fetch all video asset IDs
    const videoIds = await client.fetch(`*[_type == "sanity.video"]._id`)

    console.log(`Found ${videoIds.length} videos.`)

    for (const id of videoIds) {
      await client.delete(id)
      console.log(`✅ Deleted video asset: ${id}`)
    }

    console.log('All video assets deleted.')
  } catch (err) {
    console.error('Error deleting videos:', err)
  }
}

deleteAllVideos()

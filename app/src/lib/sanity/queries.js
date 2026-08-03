export const siteQuery = `coalesce(*[_id == "site" && _type == "site"][0], *[_type=="site"][0]){
  title,
  owner,
  description,
  themeColorsLight,
  themeColorsDark,
  defaultTheme,
  favicon{
    asset->{
      url
    }
  },
  email,
  phone
}`;

export const projectsQuery = `*[_type == "project"]
 | order(orderRank asc, _createdAt desc){
  name,
  orderRank,
  coverimage {
    "type": select(
      defined(image) => "image",
      defined(video) => "video"
    ),
    "url": select(
      defined(image.asset) => image.asset->url,
      defined(video.asset) => video.asset->url
    ),
    "lqip": select(
      defined(image.asset) => image.asset->metadata.lqip,
      true => null
    ),
    "width": select(
      defined(image.asset) => image.asset->metadata.dimensions.width,
      true => null
    ),
    "height": select(
      defined(image.asset) => image.asset->metadata.dimensions.height,
      true => null
    ),
    "_id": select(
      defined(video.asset) => video.asset->_id,
      defined(image.asset) => image.asset->_id
    ),
    "isStatic": select(
      defined(video.asset) => true,
      true => false
    )
  },
  year,
  description,
  imagegallery[]{
    "type": select(defined(image) => "image", defined(video) => "video"),
    "_id": select(
      defined(image.asset) => image.asset->_id,
      defined(video.asset) => video.asset->_id,
      true => null
    ),
    "url": select(defined(image.asset) => image.asset->url, true => null),
    "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
    "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
    "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
    "status": select(defined(video.asset) => video.asset->status, true => null),
    "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
    "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null),
    "static_renditions": select(
      defined(video.asset) => video.asset->data.static_renditions{
        ready,
        files[]{ name, url }
      },
      true => null
    ),
    "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    )
  },
  filtering[]->{title},
  credits,
  creditsClient,
  slug,
  gridStructure,
  thumbnail {
    "type": type,
    "url": select(
      type == "image" && defined(image.asset) => image.asset->url,
      true => null
    ),
    "static_renditions": select(
      defined(video.asset) => video.asset->data.static_renditions{
        ready,
        files[]{ name, url }
      },
      true => null
    ),
    "lqip": select(
      type == "image" && defined(image.asset) => image.asset->metadata.lqip,
      true => null
    ),
    "playbackId": select(
      type == "video" && defined(video.asset) => video.asset->playbackId,
      true => null
    ),
    "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
    "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
    "assetId": select(
      type == "video" && defined(video.asset) => video.asset->assetId,
      true => null
    ),
    "status": select(
      type == "video" && defined(video.asset) => video.asset->status,
      true => null
    ),
    "_id": select(
      type == "video" && defined(video.asset) => video.asset->_id,
      type == "image" && defined(image.asset) => image.asset->_id,
      true => null
    ),
    "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    )
  }
}`;

export const filtersQuery = `*[_type=="filters"]{
  title,
}`;

export const contactQuery = `*[_type=="contact"]{
  email,
  address,
  socials,
  googleMapsLink
}`;

export const researchQuery = `*[_type=="research"]{
  imagegallery[]{
    "type": select(defined(image) => "image", defined(video) => "video"),
    "_id": select(
      defined(image.asset) => image.asset->_id,
      defined(video.asset) => video.asset->_id,
      true => null
    ),
    "url": select(defined(image.asset) => image.asset->url, true => null),
    "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
    "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
    "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
    "status": select(defined(video.asset) => video.asset->status, true => null),
    "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
    "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null),
    "static_renditions": select(
      defined(video.asset) => video.asset->data.static_renditions{
        ready,
        files[]{ name, url }
      },
      true => null
    ),
    "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    ),
    "size": size
  },
}`;

export const aboutQuery = `*[_type=="about"]{
  biography,
  service,
  clients,
  internship,
  emoji
}`;

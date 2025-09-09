"use client";

import { createContext, useState, useEffect, useMemo } from "react";
import sanityClient from "/src/client.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [work, setWork] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [research, setResearch] = useState();

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type == "project"]
         | order(defined(sortNumber) desc, sortOrder asc, _createdAt desc){
          name,
          sortOrder,
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
            "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    )
          },
          filtering[]->{title},
          creditsInhouse,
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
        }`
      )
      .then((data) => {
        setWork(data);
        setIsLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="filters"]{
          title,
        }`
      )
      .then((data) => {
        const fetchedFilters = data.map((filter) => filter.title);
        setFilters(fetchedFilters);
        setSelectedFilters(fetchedFilters);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="contact"]{
          email,
          address,
          socials,
          googleMapsLink
        }`
      )
      .then((data) => setContact(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="research"]{
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
            "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    ),
    "size": size
          },
        }`
      )
      .then((data) => setResearch(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="about"]{
          biography,
          service,
          clients,
          internship,
          emoji
        }`
      )
      .then((data) => setAbout(data))
      .catch(console.error);
  }, []);

  const value = useMemo(
    () => ({
      work,
      about,
      contact,
      filters,
      research,
      selectedFilters,
      setSelectedFilters,
      isLoading,
      error,
    }),
    [work, about, contact, filters, research, selectedFilters, isLoading, error]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

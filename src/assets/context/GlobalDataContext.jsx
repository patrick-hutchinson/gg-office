"use client";

import { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
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
        `*[_type == "project"]{
    name,
   coverimage {
  "type": select(
    defined(image) => "image",
    defined(video) => "video"
  ),
  "url": select(
    defined(image) => image.asset->url,
    defined(video) => null
  ),
  "lqip": select(
    defined(image) => image.asset->metadata.lqip,
    defined(video) => null
  ),
  "playbackId": select(
    defined(video) => video.asset->playbackId,
    defined(image) => null
  ),
    "width": select(defined(image) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image) => image.asset->metadata.dimensions.height, true => null),
  "assetId": select(
    defined(video) => video.asset->assetId,
    defined(image) => null
  ),
  "status": select(
    defined(video) => video.asset->status,
    defined(image) => null
  ),
  "_id": select(
    defined(video) => video.asset->_id,
    defined(image) => image.asset->_id
  )
},
    year,
    description,
imagegallery[]{
  "type": select(defined(image) => "image", defined(video) => "video"),
  "_id": select(
    defined(image) => image.asset->_id,
    defined(video) => video.asset->_id,
    true => null
  ),
  "url": select(defined(image.asset) => image.asset->url, true => null),
  "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
  "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
  "status": select(defined(video.asset) => video.asset->status, true => null),
  "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
  "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null)
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
  "lqip": select(
    type == "image" && defined(image.asset) => image.asset->metadata.lqip,
    true => null
  ),
  "playbackId": select(
    type == "video" && defined(video.asset) => video.asset->playbackId,
    true => null
  ),
  "width": select(defined(image) => image.asset->metadata.dimensions.width, true => null),
  "height": select(defined(image) => image.asset->metadata.dimensions.height, true => null),
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
  )
}
  }`
      )
      .then((data) => {
        setWork(data);
        console.log("fetching the data!");
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
          socials
        }`
      )
      .then((data) => setContact(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="research"]{
          imagegallery
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

  return (
    <GlobalDataContext.Provider
      value={{ work, about, contact, filters, research, selectedFilters, setSelectedFilters, isLoading, error }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

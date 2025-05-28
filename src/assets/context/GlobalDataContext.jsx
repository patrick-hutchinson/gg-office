"use client";

import React, { createContext, useState, useEffect } from "react";
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
  "type": _type,
  "url": select(
    _type == "image" => asset->url,
    _type == "file" => asset->url
  ),
  "lqip": select(
    _type == "image" => asset->metadata.lqip,
    _type == "file" => null
  ),
  "width": select(
    _type == "image" => asset->metadata.dimensions.width,
    _type == "file" => null
  ),
  "height": select(
    _type == "image" => asset->metadata.dimensions.height,
    _type == "file" => null
  )
},
    filtering[]->{title},
    creditsInhouse,
    creditsClient,
    slug,
    gridStructure,
thumbnail {
  type,
  "url": select(
    type == "image" => image.asset->url,
    type == "video" => null,
  ),
  "lqip": select(
    type == "image" => image.asset->metadata.lqip,
    type == "video" => null
  ),
  "playbackId": select(
    type == "video" => video.asset->playbackId,
    type == "image" => null
  ),
  "assetId": select(
    type == "video" => video.asset->assetId,
    type == "image" => null
  ),
  "status": select(
    type == "video" => video.asset->status,
    type == "image" => null
  ),
  "_id": select(
    type == "video" => video.asset->_id,
    type == "image" => image.asset->_id
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
      value={{ work, contact, filters, research, selectedFilters, setSelectedFilters, isLoading, error }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

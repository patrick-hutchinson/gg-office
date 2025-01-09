import React from "react";

import { useEffect, useState, useRef } from "react";
import styles from "./Work.module.css";

import ImageView from "./components/ImageView";
import ListView from "./components/ListView";

import sanityClient from "/src/client.js";
import ViewOptions from "./components/ViewOptions";

export default function Work() {
  let [work, setWork] = useState();

  let [activeView, setActiveView] = useState("Image View");

  let [filters, setFilters] = useState();
  let [selectedFilters, setSelectedFilters] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
    name,
    coverimage,
    year,
    description,
    imagegallery,
    filtering[]->{title},
    credits,
    slug
}`
      )
      .then((data) => setWork(data))
      .catch(console.error);
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

  if (!work || !selectedFilters || !filters) return <p>Loading...</p>; // Early return if there's no data

  return (
    <main>
      <ViewOptions
        activeView={activeView}
        setActiveView={setActiveView}
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <ImageView selectedFilters={selectedFilters} work={work} activeView={activeView} />
      <ListView selectedFilters={selectedFilters} work={work} activeView={activeView} />
    </main>
  );
}

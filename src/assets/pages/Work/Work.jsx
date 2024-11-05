import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/Work.module.css";

import ImageView from "./components/ImageView";
import ListView from "./components/ListView";
import Filtering from "./components/Filtering";

import sanityClient from "/src/client.js";

export default function Work() {
  let [work, setWork] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
    name,
    coverimage,
    year,
    description,
    imagegallery,
    categories,
    credits,
    slug
}`
      )
      .then((data) => setWork(data))
      .catch(console.error);
  }, []);

  let filterArray = [
    "Art Direction",
    "Brand Identity",
    "Editorial",
    "Illustration",
    "Logo",
    "Motion Design",
    "Naming",
    "Packaging",
    "Poster",
    "Typography",
    "Website",
  ];

  let [showFiltering, SetShowFiltering] = useState(false);

  let [selectedFilters, setSelectedFilters] = useState(filterArray);

  let [view, setView] = useState("Image View");

  function toggleShowFiltering(e) {
    e.preventDefault();
    SetShowFiltering(!showFiltering);
  }

  // Handle the filter received from Filtering.jsx

  function handleView(target) {
    setView(target.textContent);

    target.classList.add("active");
  }

  let ToggleView = () => {
    return (
      <ul className={`${styles.viewwrapper}`}>
        <li className={`button ${view === "Image View" ? "active" : ""}`} onClick={(e) => handleView(e.currentTarget)}>
          Image View
        </li>
        <li className={`button ${view === "List View" ? "active" : ""}`} onClick={(e) => handleView(e.currentTarget)}>
          List View
        </li>
      </ul>
    );
  };
  let ToggleFiltering = () => {
    return (
      <button className={`${styles.toggleOptions} button`} onClick={toggleShowFiltering}>
        {showFiltering ? "Less Options" : "More Options"}
      </button>
    );
  };

  return (
    <>
      <main>
        <div className={`${styles["options-wrapper"]}`}>
          <ToggleView />
          <ToggleFiltering />
        </div>

        <Filtering
          filterArray={filterArray}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          showFiltering={showFiltering}
        />

        {view === "Image View" && <ImageView selectedFilters={selectedFilters} work={work} />}
        {view === "List View" && <ListView selectedFilters={selectedFilters} work={work} />}
      </main>
    </>
  );
}

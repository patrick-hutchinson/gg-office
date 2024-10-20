import React from "react";
import { useEffect, useState, useRef } from "react";
import "./styles/Work.css";

import ImageView from "./components/ImageView";
import ListView from "./components/ListView";
import Filtering from "./components/Filtering";

export default function Work({ data }) {
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

  let [selectedFilters, setSelectedFilters] = useState(filterArray);

  let [view, setView] = useState("Image View");

  // Handle the filter received from Filtering.jsx

  function handleView(selectedView) {
    setView(selectedView);
  }

  let SelectView = () => {
    return (
      <ul>
        <li onClick={(e) => handleView(e.currentTarget.textContent)}>Image View</li>
        <li onClick={(e) => handleView(e.currentTarget.textContent)}>List View</li>
      </ul>
    );
  };

  useEffect(() => {
    console.log(selectedFilters, "selectedFilters");
  }, [selectedFilters]);

  return (
    <main>
      <SelectView />
      <Filtering filterArray={filterArray} setSelectedFilters={setSelectedFilters} />
      {view === "Image View" && <ImageView selectedFilters={selectedFilters} data={data} />}
      {view === "List View" && <ListView selectedFilters={selectedFilters} data={data} />}
    </main>
  );
}

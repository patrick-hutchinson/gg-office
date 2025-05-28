"use client";

import React, { useContext } from "react";

import { useState, useRef } from "react";

import ImageView from "./work/components/ImageView";
import ListView from "./work/components/ListView";

import ViewOptions from "./work/components/ViewOptions";
import Loading from "../../src/assets/components/Loading/Loading";
import { GlobalDataContext } from "../../src/assets/context/GlobalDataContext";

export default function Work() {
  const { work } = useContext(GlobalDataContext);
  const { filters, selectedFilters, setSelectedFilters } = useContext(GlobalDataContext);

  let [activeView, setActiveView] = useState("Image View");

  if (!work || !filters || !selectedFilters) return <Loading />;

  return (
    <main
      onScroll={(e) => {
        console.log(e, "scroll");
      }}
    >
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

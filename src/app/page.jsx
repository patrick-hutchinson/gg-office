"use client";

import { useContext, useEffect, useState } from "react";

import ImageView from "./work/components/ImageView";
import ListView from "./work/components/ListView";

import ViewOptions from "./work/components/ViewOptions";
import Loading from "../../src/assets/components/Loading/Loading";
import { GlobalDataContext } from "../../src/assets/context/GlobalDataContext";

export default function Work() {
  const { filters, selectedFilters, setSelectedFilters } = useContext(GlobalDataContext);

  let [activeView, setActiveView] = useState("Image View");

  if (!filters || !selectedFilters) return <Loading />;

  return (
    <main>
      <ViewOptions
        activeView={activeView}
        setActiveView={setActiveView}
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <ImageView selectedFilters={selectedFilters} activeView={activeView} />
      <ListView selectedFilters={selectedFilters} activeView={activeView} />
    </main>
  );
}

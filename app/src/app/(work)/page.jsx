"use client";

import { useContext, useEffect, useState } from "react";

import ImageView from "./components/ImageView/ImageView";
import ListView from "./components/ListView/ListView";

import ViewOptions from "./components/ViewOptions/ViewOptions";
import Loading from "@/components/Loading/Loading";
import { DataContext } from "@/context/DataContext";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

export default function Work() {
  const { filters, selectedFilters, setSelectedFilters } = useContext(DataContext);

  let [activeView, setActiveView] = useState("Image View");

  if (!filters || !selectedFilters) return <Loading />;

  return (
    <main>
      {hasSanityValue(filters) ? (
        <ViewOptions
          activeView={activeView}
          setActiveView={setActiveView}
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      ) : (
        <SanityPreviewFallback fieldTitle="filters" />
      )}

      <ImageView selectedFilters={selectedFilters} activeView={activeView} />
      <ListView selectedFilters={selectedFilters} activeView={activeView} />
    </main>
  );
}

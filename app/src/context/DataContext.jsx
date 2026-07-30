"use client";

import { createContext, useState, useEffect, useMemo } from "react";
import { resolveSite } from "@/lib/sanity/site";

export const DataContext = createContext();

export const DataProvider = ({ children, initialSite }) => {
  const [site, setSite] = useState(resolveSite(initialSite));
  const [work, setWork] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [research, setResearch] = useState();

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    fetch("/api/sanity/data", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch Sanity data.");
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;

        const fetchedFilters = data.filters || [];
        setSite(resolveSite(data.site));
        setWork(data.work);
        setFilters(fetchedFilters);
        setSelectedFilters(fetchedFilters);
        setContact(data.contact);
        setResearch(data.research);
        setAbout(data.about);
        setIsLoading(false);
      })
      .catch((e) => {
        if (!isMounted) return;
        setError(e);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      site,
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
    [site, work, about, contact, filters, research, selectedFilters, isLoading, error]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

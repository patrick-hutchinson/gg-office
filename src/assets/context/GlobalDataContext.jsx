import React, { createContext, useState, useEffect } from "react";
import sanityClient from "/src/client.js";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [work, setWork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // Fetch fresh data and store it
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type=="project"]{
            name,
            coverimage,
            "coverurl": image.asset->url,
            year,
            description,
            imagegallery,
            filtering[]->{title},
            credits,
            slug,
            thumbnail
          }`
      )
      .then((data) => {
        setWork(data);
        setIsLoading(false);
        // localStorage.setItem("work", JSON.stringify(data));
      })
      .catch((e) => setError(e));
  }, []);

  return <GlobalDataContext.Provider value={{ work, isLoading, error }}>{children}</GlobalDataContext.Provider>;
};

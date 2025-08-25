"use client";

import { createContext, useState, useEffect } from "react";

// Create the context
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  // Detect if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768; // Calculate the new value
      setIsMobile(newIsMobile); // Update the state
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);
  }, []);

  useEffect(() => {}, []);

  return <GlobalStateContext.Provider value={{ isMobile, isSafari }}>{children}</GlobalStateContext.Provider>;
};

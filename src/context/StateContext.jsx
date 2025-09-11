"use client";

import { createContext, useState, useEffect, use } from "react";

// Create the context
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [deviceDimensions, setDeviceDimensions] = useState({ width: 0, height: 0 });
  const [showOpening, setShowOpening] = useState(true);

  // Detect if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768; // Calculate the new value
      setIsMobile(newIsMobile); // Update the state
      setDeviceDimensions({ width: window.innerWidth, height: window.innerHeight });
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

  return (
    <StateContext.Provider value={{ isMobile, isSafari, showOpening, setShowOpening, deviceDimensions }}>
      {children}
    </StateContext.Provider>
  );
};

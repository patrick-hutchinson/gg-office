"use client";

import { createContext, useState } from "react";

// Create the context
export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return <AnimationContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</AnimationContext.Provider>;
};

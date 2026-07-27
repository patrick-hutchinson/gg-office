"use client";

import { createContext, useRef } from "react";

export const RefContext = createContext();

// RefContext and RefProvider aren't actually needed and can be removed

export const RefProvider = ({ children }) => {
  const container = useRef(null);

  return <RefContext.Provider value={{ container }}>{children}</RefContext.Provider>;
};

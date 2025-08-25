"use client";

import { createContext, useRef } from "react";

export const RefContext = createContext();

export const RefProvider = ({ children }) => {
  const container = useRef(null);

  return <RefContext.Provider value={{ container }}>{children}</RefContext.Provider>;
};

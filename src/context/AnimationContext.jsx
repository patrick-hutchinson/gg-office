"use client";

import { createContext, useState, useEffect } from "react";

// Create the context
export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const replaced = (node.nodeValue || "").replace(/—/g, '<span class="emdash-cap">—</span>');
        if (replaced !== node.nodeValue) {
          const span = document.createElement("span");
          span.innerHTML = replaced;
          node.replaceWith(...span.childNodes);
        }
      } else {
        node.childNodes.forEach(walk);
      }
    }
    walk(document.body);
  }, []);

  return <AnimationContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</AnimationContext.Provider>;
};

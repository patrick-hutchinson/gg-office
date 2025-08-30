"use client";

import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Create the context
export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const replaced = (node.nodeValue || "")
          .replace(/GG—RUGS/g, 'GG<span class="emdash-cap">—</span>RUGS')
          .replace(/GG—OFFICE/g, 'GG<span class="emdash-cap">—</span>OFFICE')
          .replace(/2021—/g, '2021<span class="emdash-cap">—</span>');
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

  useEffect(() => {
    if (pathname === "/research") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [pathname]);

  return <AnimationContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</AnimationContext.Provider>;
};

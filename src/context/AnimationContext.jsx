"use client";

import { createContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Create the context
export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const previousPathRef = useRef(null);

  const [pathChanged, setPathChanged] = useState(null);

  useEffect(() => {
    if (pathname === "/" && previousPathRef.current && previousPathRef.current !== "/") {
      console.log("Navigated from a different route to /");
      // Do whatever you need here
      setPathChanged(true);
    } else {
      setPathChanged(false);
    }

    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (/^((?!chrome|crios|fxios|android).)*safari/i.test(navigator.userAgent)) {
      document.documentElement.classList.add("is-safari");
    } else {
      document.documentElement.classList.add("is-not-safari");
    }
  }, []);

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
      // document.querySelector("footer").style.position = "fixed";
    } else {
      document.body.style.overflow = "";
      // document.querySelector("footer").style.position = "unset";
    }
  }, [pathname]);

  return (
    <AnimationContext.Provider value={{ isDarkMode, setIsDarkMode, pathChanged }}>{children}</AnimationContext.Provider>
  );
};

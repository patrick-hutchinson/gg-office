"use client";

import { createContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

// Create the context
export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const pathname = usePathname();
  const previousPathRef = useRef(null);

  const [pathChanged, setPathChanged] = useState(null);

  useEffect(() => {
    if (pathname === "/" && previousPathRef.current && previousPathRef.current !== "/") {
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
    if (pathname === "/research") {
      document.body.style.overflow = "hidden";
      // document.querySelector("footer").style.position = "fixed";
    } else {
      document.body.style.overflow = "";
      // document.querySelector("footer").style.position = "unset";
    }
  }, [pathname]);

  return <AnimationContext.Provider value={{ pathChanged }}>{children}</AnimationContext.Provider>;
};

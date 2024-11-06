import React, { useEffect, useState, useRef } from "react";

import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import openingPageStyles from "/src/assets/pages/OpeningPage/styles/OpeningPage.module.css";
import "./styles/Layout.css";
import Header from "./Header/Header";
import Footer from "./Footer";
import OpeningPage from "../pages/OpeningPage/OpeningPage";

export default function Layout({ showOpeningPage, setShowOpeningPage }) {
  let location = useLocation();
  let hasSeenOpeningPage = localStorage.getItem("hasSeenOpeningPage");

  let contentRef = useRef(null);
  let openingpageRef = useRef(null);
  let lenis = useLenis(); // Access the Lenis instance

  // Only show the opening page if the user is on the home route
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/work") {
      setShowOpeningPage(!hasSeenOpeningPage);
    } else {
      localStorage.setItem("hasSeenOpeningPage", true);
      setShowOpeningPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!hasSeenOpeningPage) {
      contentRef.current.classList.add("animate");
      if (lenis) {
        lenis.stop(); // Disable Lenis scroll behavior
      }

      document.addEventListener("click", showContent);
      document.addEventListener("wheel", showContent);
      window.addEventListener("touchmove", showContent);

      return () => {
        document.removeEventListener("click", showContent);
        document.removeEventListener("wheel", showContent);
        window.removeEventListener("touchmove", showContent);

        if (lenis) {
          lenis.start(); // Re-enable Lenis scroll behavior
        }
      };
    }
  }, [hasSeenOpeningPage, lenis]);

  const showContent = () => {
    contentRef.current.classList.add("animate-in");
    openingpageRef.current.classList.add(openingPageStyles["animate-out"]);

    setTimeout(() => {
      localStorage.setItem("hasSeenOpeningPage", "true");
      setShowOpeningPage(false);
      contentRef.current.classList.remove("animate");
      contentRef.current.classList.remove("animate-in");

      if (lenis) {
        lenis.start(); // Enable Lenis again
      }
    }, 1200);
  };

  return (
    <ReactLenis root>
      {showOpeningPage && <OpeningPage ref={openingpageRef} />}
      <div id="content" ref={contentRef}>
        <Header location={location.pathname}></Header>
        <Outlet />
        <Footer />
      </div>
    </ReactLenis>
  );
}

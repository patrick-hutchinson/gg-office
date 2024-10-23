import React from "react";

import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import "./styles/Layout.css";

import Header from "./Header";
import Footer from "./Footer";
import GGOFFICE from "../pages/GGOFFICE/GGOFFICE";

export default function Layout({ showOpeningPage, setShowOpeningPage }) {
  const location = useLocation();

  useEffect(() => {
    // Only show the opening page if the user is on the home route
    if (location.pathname === "/" || location.pathname === "/work") {
      const hasSeenOpeningPage = localStorage.getItem("hasSeenOpeningPage");
      setShowOpeningPage(!hasSeenOpeningPage);
    } else {
      localStorage.setItem("hasSeenOpeningPage", true);
      setShowOpeningPage(false);
    }
  }, [location.pathname]);

  return (
    <ReactLenis root>
      {showOpeningPage && <GGOFFICE setShowOpeningPage={setShowOpeningPage} />}
      <Header location={location.pathname}></Header>
      <Outlet />
      <Footer />
    </ReactLenis>
  );
}

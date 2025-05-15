import React, { useEffect, useState, useRef } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { easeInOut, motion } from "framer-motion";

import "./styles/Layout.css";
import Header from "./Header/Header";
import Footer from "./Footer";
import OpeningPage from "../pages/OpeningPage/OpeningPage";

export default function Layout() {
  const location = useLocation();
  const lenis = useLenis(); // Access the Lenis instance

  const openingRef = useRef(null);
  const contentRef = useRef(null);

  let isHome = location.pathname === "/";

  let [showOpening, setShowOpening] = useState(isHome ? true : false);

  const [hasRouteChanged, setHasRouteChanged] = useState(false);

  useEffect(() => {
    setHasRouteChanged(location.pathname == "/" ? true : false);
  }, [location.pathname]);

  useEffect(() => {
    console.log(showOpening, "showOpening?");
  }, [showOpening]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []); // Always scroll to the top

  useEffect(() => {
    showOpening && lenis?.stop();
  }, [lenis]); // Initially stop lenis, if the Opening is visible

  useEffect(() => {
    if (showOpening) {
      console.log("scrollin content to the top!");
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [showOpening]);

  const handleAnimationComplete = () => {
    showOpening ? lenis?.stop() : lenis?.start();
  }; // After the animation is complete, handle the lenis state

  const openingVariants = {
    inView: {
      transition: { duration: hasRouteChanged ? 1 : 0, easeInOut },
      transform: "translateY(0)",
    },
    outOfView: {
      transition: { duration: 1, easeInOut },
      transform: "translateY(calc(-100vh + 45px))",
    },
  };

  const contentVariants = {
    outOfView: {
      transition: { duration: hasRouteChanged ? 1 : 0, easeInOut },
      transform: "translateY(calc(100vh - 45px))",
    },
    inView: {
      transition: { duration: 1, easeInOut },
      transform: "translateY(0)",
    },
  };

  return (
    <ReactLenis root>
      <motion.div
        id="container"
        onClick={() => showOpening && setShowOpening(false)}
        onWheel={() => showOpening && setShowOpening(false)}
      >
        <motion.div
          id="opening"
          initial={false}
          animate={showOpening ? "inView" : "outOfView"}
          variants={openingVariants}
          onAnimationComplete={() => handleAnimationComplete()}
        >
          <OpeningPage ref={openingRef} />
        </motion.div>
        <motion.div
          id="content"
          ref={contentRef}
          initial={false}
          animate={showOpening ? "outOfView" : "inView"}
          variants={contentVariants}
          onAnimationComplete={() => handleAnimationComplete()}
        >
          <Header location={location.pathname} setShowOpening={setShowOpening} />
          <Outlet />
          <Footer />
        </motion.div>
      </motion.div>
    </ReactLenis>
  );
}

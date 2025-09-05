"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

import { enableScroll, disableScroll } from "../../helpers/blockScrolling";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
// import OpeningPage from "@/components/OpeningPage/OpeningPage";

const OpeningPage = dynamic(() => import("@/components/OpeningPage/OpeningPage"), { ssr: false });

import { AnimationContext } from "@/context/AnimationContext";

export default function ClientLayout({ children }) {
  const container = useRef(null);

  const [showOpening, setShowOpening] = useState(true);
  const { pathChanged } = useContext(AnimationContext);
  const pathname = usePathname();

  const openingRef = useRef(null);

  const isHome = pathname === "/";

  useEffect(() => {
    if (showOpening) disableScroll();
  }, [showOpening]);

  const handleAnimationComplete = () => {
    if (showOpening) {
      disableScroll();
      container.current.classList.add("no-scroll");
    } else {
      enableScroll();
      container.current.classList.remove("no-scroll");
    }
  };

  useEffect(() => {
    if (pathChanged && !showOpening) {
      container.current.classList.remove("no-scroll");
    }
  }, [pathChanged]);

  const openingVariants = {
    inView: {
      transform: "translateY(0)",
      transition: { transform: { duration: isHome ? 1 : 0, ease: "easeInOut" } },
    },
    outOfView: {
      transform: "translateY(calc(-100vh + 55px))",
      transition: { transform: { duration: 1, ease: "easeInOut" } },
    },
  };

  const contentVariants = {
    outOfView: {
      transition: { transform: { duration: isHome ? 1 : 0, ease: "easeInOut" } },
      transform: "translateY(calc(100vh - 55px))",
    },
    inView: {
      transition: { transform: { duration: 1, ease: "easeInOut" } },
      transform: "translateY(0)",
    },
  };

  const handleScroll = (e) => {
    e.preventDefault();
  };

  const handleOpening = () => {
    if (showOpening) setShowOpening(false);
  };

  return (
    <div onWheel={() => handleOpening()} onTouchStart={() => handleOpening()}>
      <motion.div
        id="opening"
        initial={false}
        animate={showOpening ? "inView" : "outOfView"}
        variants={openingVariants}
        onAnimationComplete={handleAnimationComplete}
        onClick={() => handleOpening()}
      >
        <OpeningPage ref={openingRef} showOpening={showOpening} />
      </motion.div>
      <motion.div
        id="content"
        className={"no-scroll"}
        ref={container}
        initial={false}
        animate={showOpening ? "outOfView" : "inView"}
        variants={contentVariants}
        onAnimationComplete={handleAnimationComplete}
        onScroll={(e) => {
          handleScroll(e);
        }}
      >
        <Header location={pathname} showOpening={showOpening} setShowOpening={setShowOpening} />

        <div id="root">{children}</div>
        <Footer />
      </motion.div>
    </div>
  );
}

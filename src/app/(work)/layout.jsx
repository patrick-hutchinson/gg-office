"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { enableScroll, disableScroll } from "../../helpers/blockScrolling";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import OpeningPage from "@/components/OpeningPage/OpeningPage";

import { RefContext } from "../../context/RefContext";

export default function ClientLayout({ children }) {
  const { container } = useContext(RefContext);
  const pathname = usePathname();

  const openingRef = useRef(null);
  // const contentRef = useRef(null);

  const isHome = pathname === "/";

  //Show the Opening if the user starts on the Home/Work page
  const [showOpening, setShowOpening] = useState(isHome);

  useEffect(() => {
    if (showOpening) disableScroll();
  }, [showOpening]);

  useEffect(() => {
    container.current.scrollTop = 0;
  }, [showOpening]);

  const handleAnimationComplete = () => {
    if (showOpening) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const openingVariants = {
    inView: {
      transform: "translateY(0)",
      transition: { transform: { duration: isHome ? 1 : 0, ease: "easeInOut" } },
    },
    outOfView: {
      transform: "translateY(calc(-100vh + 45px))",
      transition: { transform: { duration: 1, ease: "easeInOut" } },
    },
  };

  const contentVariants = {
    outOfView: {
      transition: { transform: { duration: isHome ? 1 : 0, ease: "easeInOut" } },
      transform: "translateY(calc(100vh - 45px))",
    },
    inView: {
      transition: { transform: { duration: 1, ease: "easeInOut" } },
      transform: "translateY(0)",
    },
  };

  const handleOpening = () => {
    if (showOpening) setShowOpening(false);
  };

  return (
    <div onClick={() => handleOpening()} onWheel={() => handleOpening()}>
      <motion.div
        id="opening"
        initial={false}
        animate={showOpening ? "inView" : "outOfView"}
        variants={openingVariants}
        onAnimationComplete={handleAnimationComplete}
      >
        <OpeningPage ref={openingRef} />
      </motion.div>
      <motion.div
        id="content"
        ref={container}
        initial={false}
        animate={showOpening ? "outOfView" : "inView"}
        variants={contentVariants}
        onAnimationComplete={handleAnimationComplete}
      >
        <Header location={pathname} setShowOpening={setShowOpening} />

        <div id="root">{children}</div>

        <Footer />
      </motion.div>
    </div>
  );
}

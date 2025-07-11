"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";

import Header from "../../src/assets/components/Header/Header";
import Footer from "../../src/assets/components/Footer";
import OpeningPage from "../../src/assets/components/OpeningPage/OpeningPage";

import { GlobalStateContext } from "../assets/context/GlobalStateContext";

export default function ClientLayout({ children }) {
  const { isMobile } = useContext(GlobalStateContext);
  const pathname = usePathname();
  const lenis = useLenis();

  const openingRef = useRef(null);
  const contentRef = useRef(null);

  const isHome = pathname === "/";
  const [showOpening, setShowOpening] = useState(isHome);
  const [hasRouteChanged, setHasRouteChanged] = useState(false);

  // Logs
  if (lenis) {
    lenis.on("scroll", ({ scroll, limit }) => {
      // console.log({ scroll, limit });
      lenis.resize();
    });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [isHome]); // This works, but the page is still scrolling down on route change

  useEffect(() => {
    showOpening && lenis?.stop();
  }, [lenis, showOpening]);

  useEffect(() => {
    setHasRouteChanged(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (showOpening && lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 0.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
    }
  }, [showOpening, lenis]);

  const handleAnimationComplete = () => {
    if (showOpening) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  };

  const openingVariants = {
    inView: {
      transition: { duration: hasRouteChanged ? 1 : 0, ease: "easeInOut" },
      transform: "translateY(0)",
    },
    outOfView: {
      transition: { duration: 1, ease: "easeInOut" },
      transform: "translateY(calc(-100vh + 45px))",
    },
  };

  const contentVariants = {
    outOfView: {
      transition: { duration: hasRouteChanged ? 1 : 0, ease: "easeInOut" },
      transform: "translateY(calc(100vh - 45px))",
    },
    inView: {
      transition: { duration: 1, ease: "easeInOut" },
      transform: "translateY(0)",
    },
  };

  const content = (
    <div onClick={() => showOpening && setShowOpening(false)} onWheel={() => showOpening && setShowOpening(false)}>
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
        ref={contentRef}
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

  return isMobile ? (
    content
  ) : (
    <ReactLenis root smooth={true}>
      {content}
    </ReactLenis>
  );
}

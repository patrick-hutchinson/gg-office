"use client";

import React, { useEffect, useRef, forwardRef, useContext, useState } from "react";

import styles from "./styles/OpeningPage.module.css";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { StateContext } from "../../context/StateContext";
import { useTheme } from "next-themes";

const OpeningPage = forwardRef(({ showOpening }, openingRef) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  OpeningPage.displayName = "OpeningPage";

  const { isMobile, isSafari } = useContext(StateContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const letters = ["G", "O", "O", "D", "G", "A", "M", "E"];
  let columnsRef = useRef([]);
  let lastY = useRef([]);

  const DesktopOpening = ({ letter, index }) => {
    const mouseY = useMotionValue(lastY.current[index] ? lastY.current[index] : 180);

    const smoothMouseY = useSpring(mouseY, {
      stiffness: isSafari ? 180 : 100,
      damping: isSafari ? 50 : 20,
      mass: 1,
    });

    const gridTemplateRows = useTransform(smoothMouseY, (y) => {
      const columnElement = columnsRef.current[index];
      if (!columnElement) return;

      const rect = columnElement.getBoundingClientRect();

      // 15 is the element's top offset, here hardcoded. Ideally replace with getComputedStyle
      const relY = (y - 15) / rect.height;

      const clamped = Math.min(1, Math.max(0, relY));
      const top = clamped * 100;
      const bottom = 100 - top;
      return `${top}% ${bottom}%`;
    });

    if (!mounted) return null;
    if (!theme) return null;

    return (
      <motion.div
        ref={(el) => (columnsRef.current[index] = el)}
        className={styles.column}
        style={{ gridTemplateRows, willChange: "transform" }}
        onMouseMove={(e) => {
          mouseY.set(e.clientY);
          lastY.current[index] = e.clientY;
        }}
      >
        {[...Array(2)].map((_, i) => (
          <img
            key={i}
            src={`/assets/images/GOODGAME/${letter}.png`}
            alt={letter}
            style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }}
          />
        ))}
      </motion.div>
    );
  };

  const MobileOpening = ({ index, letter }) => {
    const currentRows = columnsRef.current[index]
      ? getComputedStyle(columnsRef.current[index]).gridTemplateRows
      : "50% 50%";

    return (
      <motion.div
        style={{ willChange: "transform" }}
        ref={(el) => (columnsRef.current[index] = el)}
        className={styles.column}
        animate={
          showOpening ? { gridTemplateRows: ["0% 100%", "100% 0%", "0% 100%"] } : { gridTemplateRows: currentRows }
        }
        transition={
          showOpening
            ? {
                duration: 2.1,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index / 5,
              }
            : { duration: 0, ease: "easeInOut", repeat: Infinity, delay: 0 }
        }
      >
        {[...Array(2)].map((_, i) => (
          <img
            key={i}
            src={`/assets/images/GOODGAME/${letter}.png`}
            alt={letter}
            style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className={`${styles.wrapper} wrapper`} ref={openingRef}>
      {letters.map((letter, index) =>
        isMobile ? (
          <MobileOpening key={index} letter={letter} index={index} />
        ) : (
          <DesktopOpening key={index} letter={letter} index={index} />
        )
      )}
    </div>
  );
});

export default OpeningPage;

"use client";

import { useEffect, useRef, forwardRef, useContext, useState } from "react";

import styles from "./styles/OpeningPage.module.css";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { GlobalStateContext } from "../../context/GlobalStateContext";
import { AnimationContext } from "../../context/AnimationContext";

const OpeningPage = forwardRef((props, openingRef, showOpening) => {
  OpeningPage.displayName = "OpeningPage";

  const { isMobile } = useContext(GlobalStateContext);
  const { isDarkMode } = useContext(AnimationContext);

  const letters = ["G", "O", "O", "D", "G", "A", "M", "E"];
  let columnsRef = useRef([]);
  let lastY = useRef([]);

  const LetterColumn = ({ letter, index }) => {
    const mouseY = useMotionValue(lastY.current[index] ? lastY.current[index] : 180);

    const smoothMouseY = useSpring(mouseY, {
      stiffness: 100,
      damping: 20,
      mass: 1,
    });

    const gridTemplateRows = useTransform(smoothMouseY, (y) => {
      const columnElement = columnsRef.current[index];
      if (!columnElement) return;

      const rect = columnElement.getBoundingClientRect();
      console.log(rect.height, "height", rect.top, "top");
      const relY = (y - 15) / rect.height;
      console.log(relY, "relY");
      const clamped = Math.min(1, Math.max(0, relY));
      const top = clamped * 100;
      const bottom = 100 - top;
      return `${top}% ${bottom}%`;
    });

    return (
      <motion.div
        ref={(el) => (columnsRef.current[index] = el)}
        className={styles.column}
        style={{ gridTemplateRows }}
        onMouseMove={(e) => {
          mouseY.set(e.clientY);
          lastY.current[index] = e.clientY;
        }}
      >
        <img
          src={`/assets/images/GOODGAME/${letter}.png`}
          alt={letter}
          style={{ filter: isDarkMode ? "none" : "invert(1)" }}
        />
        <img
          src={`/assets/images/GOODGAME/${letter}.png`}
          alt={letter}
          style={{ filter: isDarkMode ? "none" : "invert(1)" }}
        />
      </motion.div>
    );
  };

  return (
    <div className={styles.wrapper} ref={openingRef}>
      {letters.map((letter, index) => (
        <LetterColumn key={index} letter={letter} index={index} />
      ))}
    </div>
  );
});

export default OpeningPage;

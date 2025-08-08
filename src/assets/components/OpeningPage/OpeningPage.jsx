"use client";

import { useEffect, useRef, forwardRef, useContext } from "react";

import styles from "./styles/OpeningPage.module.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { GlobalStateContext } from "../../context/GlobalStateContext";
import { AnimationContext } from "../../context/AnimationContext";

const OpeningPage = forwardRef((props, openingRef) => {
  OpeningPage.displayName = "OpeningPage";

  const { isMobile } = useContext(GlobalStateContext);
  const { isDarkMode } = useContext(AnimationContext);

  const letters = ["G", "O", "O", "D", "G", "A", "M", "E"];
  let columnsRef = useRef([]);

  // Mobile Animation
  useGSAP(
    () => {
      if (!isMobile) {
        gsap.killTweensOf(columnsRef.current);
        return;
      }
      columnsRef.current.forEach((column, index) => {
        gsap.to(column, {
          gridTemplateRows: ["10% 90%"],
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.2 * index,
        });
      });
    },
    { scope: openingRef, dependencies: [isMobile] }
  );

  useEffect(() => {
    const cleanupTargets = columnsRef.current;
    return () => {
      gsap.killTweensOf(cleanupTargets);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={openingRef}>
      {letters.map((letter, index) => {
        // Raw mouse Y position
        const mouseY = useMotionValue(0);
        // Smoothed version of mouseY
        const smoothMouseY = useSpring(mouseY, {
          stiffness: 100, // higher = snappier, lower = looser
          damping: 20, // higher = less oscillation
          mass: 1,
        });

        // Map smoothed mouse Y to gridTemplateRows style
        const gridTemplateRows = useTransform(smoothMouseY, (y) => {
          const colEl = columnsRef.current[index];
          if (!colEl) return "90% 10%";

          const rect = colEl.getBoundingClientRect();
          // Calculate relative Y inside the column (0 at top, 1 at bottom)
          const relY = (y - rect.top) / rect.height;
          // Clamp between 0 and 1
          const clamped = Math.min(1, Math.max(0, relY));
          // Convert to percentages for grid rows
          const top = clamped * 100;
          const bottom = 100 - top;
          return `${top}% ${bottom}%`;
        });

        return (
          <motion.div
            key={index}
            ref={(el) => (columnsRef.current[index] = el)}
            className={styles.column}
            style={{
              gridTemplateRows,
            }}
            onMouseMove={(e) => mouseY.set(e.clientY)}
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
      })}
    </div>
  );
});

export default OpeningPage;

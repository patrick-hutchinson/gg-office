"use client";

import { useEffect, useRef, forwardRef, useContext } from "react";

import styles from "./styles/OpeningPage.module.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { GlobalStateContext } from "../../context/GlobalStateContext";

const OpeningPage = forwardRef((props, openingRef) => {
  OpeningPage.displayName = "OpeningPage";

  const { isMobile } = useContext(GlobalStateContext); // Access isMobile from the context

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

  // Desktop Animation
  const { contextSafe } = useGSAP();
  const handleMouseEnter = contextSafe((e) => {
    if (isMobile) return; // Skip animation logic if on mobile
    const rect = openingRef.current.getBoundingClientRect();
    const rectHeight = openingRef.current.offsetHeight;
    const mouseYInElement = e.clientY - rect.top;

    let leftValue = mouseYInElement / rectHeight;
    let rightValue = 1 - leftValue;

    gsap.to(e.currentTarget, {
      gridTemplateRows: [`${leftValue * 100}% ${rightValue * 100}%`],
      duration: 0.6,
      ease: "power1.inOut",
    });
  });

  return (
    <div className={styles.wrapper} ref={openingRef}>
      {letters.map((letter, index) => (
        <div
          key={index}
          className={styles.column}
          ref={(el) => (columnsRef.current[index] = el)}
          onMouseEnter={handleMouseEnter}
        >
          <img src={`/assets/images/GOODGAME/${letter}.png`} alt={letter} />
          <img src={`/assets/images/GOODGAME/${letter}.png`} alt={letter} />
        </div>
      ))}
    </div>
  );
});

export default OpeningPage;

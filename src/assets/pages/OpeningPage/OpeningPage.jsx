import React from "react";

import { useEffect, useState, useRef, forwardRef, useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/OpeningPage.module.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { GlobalStateContext } from "../../context/GlobalStateContext";

const OpeningPage = forwardRef((props, containerRef) => {
  const { isMobile } = useContext(GlobalStateContext); // Access isMobile from the context

  const letters = ["G", "O", "O", "D", "G", "A", "M", "E"];
  let columnsRef = useRef([]);

  // useEffect(() => {
  //   // Cleanup function to remove event listeners

  //   // Add listeners when not mobile
  //   columnRef.current.forEach((column) => {
  //     const listener = (e) => {
  //       const rect = containerRef.current.getBoundingClientRect();
  //       const rectHeight = containerRef.current.offsetHeight;
  //       const mouseYInElement = e.clientY - rect.top;

  //       let leftValue = mouseYInElement / rectHeight;
  //       let rightValue = 1 - leftValue;

  //       column.style["grid-template-rows"] = `${leftValue * 100}% ${rightValue * 100}%`;
  //     };

  //     column.addEventListener("mouseenter", listener);
  //     column.listener = listener; // Store reference for cleanup
  //   });
  // }, [isMobile]);

  // useGSAP(() => {}, { dependencies });

  useGSAP(
    () => {
      if (!isMobile) {
        return; // Skip animation logic if not on mobile
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
    { scope: containerRef, dependencies: [isMobile] }
  );

  useGSAP(
    (context, contextSafe) => {
      if (isMobile) {
        return; // Skip animation logic if not on mobile
      }

      const onMouseEnter = contextSafe((e, column) => {
        console.log(e, "s");
        const rect = containerRef.current.getBoundingClientRect();
        const rectHeight = containerRef.current.offsetHeight;
        const mouseYInElement = e.clientY - rect.top;

        let leftValue = mouseYInElement / rectHeight;
        let rightValue = 1 - leftValue;

        gsap.to(column, {
          gridTemplateRows: [`${leftValue * 100}% ${rightValue * 100}%`],
          duration: 0.6,
          ease: "power1.inOut",
        });
      });

      // Keep track of cleanup functions
      const cleanupFunctions = [];

      columnsRef.current.forEach((column) => {
        const handleMouseEnter = (e) => onMouseEnter(e, column);
        column.addEventListener("mouseenter", handleMouseEnter);

        // Store the cleanup function
        cleanupFunctions.push(() => {
          column.removeEventListener("mouseenter", handleMouseEnter);
        });
      });

      // Return a cleanup function that removes all event listeners
      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <section>
      <div className={styles.wrapper} ref={containerRef}>
        {letters.map((letter, index) => (
          <div key={index} className={styles.column} ref={(el) => (columnsRef.current[index] = el)}>
            <img src={`/assets/images/GOODGAME/${letter}.png`} alt={letter} />
            <img src={`/assets/images/GOODGAME/${letter}.png`} alt={letter} />
          </div>
        ))}
      </div>
    </section>
  );
});

export default OpeningPage;

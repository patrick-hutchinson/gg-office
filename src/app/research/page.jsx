"use client";

import { useState, useEffect, useRef, useContext } from "react";

import { motion, useScroll, useMotionValue, useMotionValueEvent, wrap } from "framer-motion";

import { GlobalDataContext } from "../../assets/context/GlobalDataContext";

import styles from "./styles/research.module.css";
import RenderMedia from "../../assets/components/RenderMedia";

export default function Gallery() {
  const { research } = useContext(GlobalDataContext);

  const columnCount = 3;

  if (!research) return;

  const Column = ({ columnNumber }) => {
    const mediaRefs = useRef([]);
    const virtualScroll = useMotionValue(0);

    // Store the height of each column to determine where the reset breakpoint for each column is
    const [totalHeight, setTotalHeight] = useState(0);

    // Calculate the totalHeight by adding all media-container heights + accumalated gap
    useEffect(() => {
      if (!mediaRefs.current) return;

      let sum = 0;
      mediaRefs.current.forEach((medium) => {
        sum += medium.getBoundingClientRect().height;
      });

      const gap = mediaRefs.current.length * 70;

      // Add the height of the images (sum) to the gap and divide by 2, since we loop once the next image appears
      setTotalHeight((sum + gap) / 2);
    }, []);

    useEffect(() => {
      console.log(`totalheight for column ${columnNumber} is ${totalHeight}`);
    }, [totalHeight]);

    //Capture and transform virtual scroll
    useEffect(() => {
      const handleWheel = (e) => {
        const current = virtualScroll.get();
        let newY = current + e.deltaY;

        // Wrap the scroll value once totalHeight is reached
        newY = wrap(-totalHeight, 0, newY);

        virtualScroll.set(newY);
      };

      window.addEventListener("wheel", handleWheel);
      return () => window.removeEventListener("wheel", handleWheel);
    }, [virtualScroll, totalHeight]);

    // Duplicate the array by concatenation (A duplicated column is needed for the infinite scroll to be seemless)
    const items = research[0].imagegallery
      .slice(0, 32)
      .filter((_, index) => index % columnCount === columnNumber)
      .sort((a, b) => {
        if (a.type === "image" && b.type !== "image") return -1; // a comes first
        if (a.type !== "image" && b.type === "image") return 1; // b comes first
        return 0; // keep relative order otherwise
      });
    const duplicatedItems = [...items, ...items];

    return (
      <motion.div className={styles["column"]} style={{ translateY: virtualScroll }}>
        {duplicatedItems.map((medium, index) => (
          <div
            key={index}
            ref={(el) => (mediaRefs.current[index] = el)}
            className={styles["media-container"]}
            style={{ width: "300px" }}
          >
            <RenderMedia medium={medium} />
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container-inner"]}>
        {Array.from({ length: columnCount }, (column, index) => (
          <Column key={index} columnNumber={index} />
        ))}
      </div>
    </div>
  );
}

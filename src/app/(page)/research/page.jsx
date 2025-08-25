"use client";

import { useState, useEffect, useRef, useContext, useMemo } from "react";

import { motion, useScroll, useMotionValue, useMotionValueEvent, wrap, useSpring } from "framer-motion";

import { GlobalDataContext } from "@/context/GlobalDataContext";
import { GlobalStateContext } from "@/context/GlobalStateContext";

import styles from "./styles/Research.module.css";
import RenderMedia from "@/components/RenderMedia";

import Loading from "@/components/Loading/Loading";

export default function Gallery() {
  const { isMobile } = useContext(GlobalStateContext);
  const { research } = useContext(GlobalDataContext);

  if (!research) return <Loading />;

  // Variable declaration
  const columnCount = isMobile ? 2 : 3;

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

    //Capture and transform virtual scroll
    useEffect(() => {
      const handleWheel = (e) => {
        const current = virtualScroll.get();
        let newY = current - e.deltaY;

        // Wrap the scroll value once totalHeight is reached
        newY = wrap(-totalHeight, 0, newY);

        virtualScroll.set(newY);
      };

      window.addEventListener("wheel", handleWheel);
      return () => window.removeEventListener("wheel", handleWheel);
    }, [virtualScroll, totalHeight]);

    // Duplicate the array by concatenation (A duplicated column is needed for the infinite scroll to be seemless)
    // Also, add images to the Beginning and end of each array to allow for a seemless switch
    const items = research[0].imagegallery.filter((_, index) => index % columnCount === columnNumber);

    const images = items.filter((item) => item.type === "image");

    // take first 3 images for the start, next 2 images for the end
    const startImages = images.slice(0, 3);
    const endImages = images.slice(3, 6);
    const middleItems = [...items].filter((item) => !startImages.includes(item) && !endImages.includes(item));

    const rearrangedItems = [...startImages, ...middleItems, ...endImages];

    // Generate random widths only once per mount
    const widths = useMemo(() => {
      return rearrangedItems.map(() => {
        return Math.random() * (400 - 200) + 200; // px between 270 and 320
      });
    }, [rearrangedItems.length]); // depend on length, not items array

    // Duplicate items
    const duplicatedItems = [...rearrangedItems, ...rearrangedItems];

    return (
      <motion.div className={styles["column"]} style={{ translateY: virtualScroll }}>
        {duplicatedItems.map((medium, index) => {
          const width = widths[index % rearrangedItems.length]; // match original's width
          return (
            <div
              key={index}
              ref={(el) => (mediaRefs.current[index] = el)}
              className={styles["media-container"]}
              style={{ width: `${width}px` }}
            >
              <RenderMedia medium={medium} />
            </div>
          );
        })}
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

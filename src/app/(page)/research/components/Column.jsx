import { useState, useEffect, useRef, useContext, useMemo } from "react";

import { animate, motion, useMotionValue, wrap } from "framer-motion";

import RenderMedia from "@/components/RenderMedia/RenderMedia";

import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";

import styles from "../styles/Research.module.css";

export default function Column({ columnNumber, columnCount, mobileScroll }) {
  const mediaRefs = useRef([]);
  const virtualScroll = useMotionValue(0);

  const { research } = useContext(DataContext);
  const { isMobile } = useContext(StateContext);

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

  // Mobile virtualScroll
  useEffect(() => {
    if (!totalHeight) return; // wait until totalHeight is measured

    const current = virtualScroll.get() || 0;

    // Apply resistance factor (e.g. 0.5 halves the sensitivity)
    const resistance = 0.5;
    let newY = current - mobileScroll * resistance;

    newY = wrap(-totalHeight, 0, newY);

    virtualScroll.set(newY);
  }, [mobileScroll, totalHeight, virtualScroll]);

  // Desktop virtualScroll
  useEffect(() => {
    const handleWheel = (e) => {
      console.log(e.deltaY, "deltaY");
      const current = virtualScroll.get();
      let newY = current - e.deltaY;

      // Wrap the scroll value once totalHeight is reached
      newY = wrap(-totalHeight, 0, newY);

      virtualScroll.set(newY);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [virtualScroll, totalHeight]);

  // Distribute items evenly: take every nth item for this column
  const items = research[0].imagegallery.filter((_, index) => index % columnCount === columnNumber);

  // take first 3 images for the start, next 2 images for the end
  const images = items.filter((item) => item.type === "image");

  const startImages = images.slice(0, 3);
  const endImages = images.slice(3, 6);
  const middleItems = [...items].filter((item) => !startImages.includes(item) && !endImages.includes(item));

  const rearrangedItems = [...startImages, ...middleItems, ...endImages];

  // Generate random widths only once per mount
  const widths = useMemo(() => {
    const vw = window.innerWidth;

    // Scale ranges relative to viewport width
    const { min, max } = isMobile
      ? { min: vw * 0.25, max: vw * 0.4 } // 25–40% of screen
      : { min: vw * 0.15, max: vw * 0.25 }; // 15–30% of screen

    return rearrangedItems.map(() => Math.random() * (max - min) + min);
  }, [rearrangedItems.length, isMobile]);

  // Generate random left values only once per mount
  const leftValues = useMemo(() => {
    // The left value depends on the position of the column.
    let leftValueRanges = [];

    isMobile
      ? (leftValueRanges = [
          { min: 0, max: 50 },
          { min: -50, max: 0 },
        ])
      : (leftValueRanges = [
          { min: 0, max: 100 },
          { min: -100, max: 100 },
          { min: -100, max: 0 },
        ]);

    return rearrangedItems.map(() => {
      // -> Select the left value range depening on the column index
      const { min, max } = leftValueRanges[columnNumber];

      return Math.random() * (max - min) + min;
    });
  }, [rearrangedItems.length, columnNumber]);

  // Duplicate items
  const duplicatedItems = [...rearrangedItems, ...rearrangedItems];

  return (
    <motion.div className={styles["column"]} style={{ translateY: virtualScroll }}>
      {duplicatedItems.map((medium, index) => {
        const width = widths[index % rearrangedItems.length]; // match original's width
        const left = leftValues[index % rearrangedItems.length]; // match original's width
        return (
          <div
            key={index}
            ref={(el) => (mediaRefs.current[index] = el)}
            className={styles["media-container"]}
            style={{ width: `${width}px`, left: `${left}px`, position: "relative" }}
          >
            <RenderMedia medium={medium} enableFullscreen={true} />
          </div>
        );
      })}
    </motion.div>
  );
}

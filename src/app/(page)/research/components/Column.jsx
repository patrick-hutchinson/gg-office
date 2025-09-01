import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { motion, useMotionValue, wrap, useMotionValueEvent } from "framer-motion";

import RenderMedia from "@/components/RenderMedia/RenderMedia";
import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";

import styles from "../styles/Research.module.css";

export default function Column({ columnNumber, columnCount, mobileDeltaY }) {
  const mediaRefs = useRef([]);
  const virtualScroll = useMotionValue(0);

  const { research } = useContext(DataContext);
  const { isMobile } = useContext(StateContext);

  const [totalHeight, setTotalHeight] = useState(0);

  // Compute totalHeight once
  useEffect(() => {
    if (!mediaRefs.current) return;

    let sum = 0;
    mediaRefs.current.forEach((medium) => {
      sum += medium.getBoundingClientRect().height;
    });

    const gap = mediaRefs.current.length * 70;
    setTotalHeight((sum + gap) / 2);
  }, []);

  // Listen directly to mobileDeltaY changes
  useMotionValueEvent(mobileDeltaY, "change", (deltaY) => {
    if (!totalHeight) return;

    const current = virtualScroll.get();
    const resistance = 0.5;

    // Alternate directions for columns if desired
    const newY = columnNumber % 2 ? current - deltaY * resistance : current + deltaY * resistance;

    virtualScroll.set(wrap(-totalHeight, 0, newY));
  });

  // Desktop wheel remains unchanged
  useEffect(() => {
    const handleWheel = (e) => {
      if (!totalHeight) return;
      const current = virtualScroll.get();
      const newY = columnNumber % 2 ? current - e.deltaY : current + e.deltaY;
      virtualScroll.set(wrap(-totalHeight, 0, newY));
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [virtualScroll, totalHeight]);

  // Prepare images and layout as before
  const items = research[0].imagegallery.filter((_, index) => index % columnCount === columnNumber);
  const images = items.filter((item) => item.type === "image");

  const startImages = images.slice(0, 3);
  const endImages = images.slice(3, 6);
  const middleItems = [...items].filter((item) => !startImages.includes(item) && !endImages.includes(item));
  const rearrangedItems = [...startImages, ...middleItems, ...endImages];

  const widths = useMemo(() => {
    const vw = window.innerWidth;
    const { min, max } = isMobile ? { min: vw * 0.25, max: vw * 0.4 } : { min: vw * 0.15, max: vw * 0.25 };
    return rearrangedItems.map(() => Math.random() * (max - min) + min);
  }, [rearrangedItems.length, isMobile]);

  const leftValues = useMemo(() => {
    const leftValueRanges = isMobile
      ? [
          { min: 0, max: 50 },
          { min: -50, max: 0 },
        ]
      : [
          { min: 0, max: 100 },
          { min: -100, max: 100 },
          { min: -100, max: 0 },
        ];

    return rearrangedItems.map(() => {
      const { min, max } = leftValueRanges[columnNumber];
      return Math.random() * (max - min) + min;
    });
  }, [rearrangedItems.length, columnNumber]);

  const duplicatedItems = [...rearrangedItems, ...rearrangedItems];

  return (
    <motion.div className={styles["column"]} style={{ translateY: virtualScroll }}>
      {duplicatedItems.map((medium, index) => {
        const width = widths[index % rearrangedItems.length];
        const left = leftValues[index % rearrangedItems.length];
        return (
          <div
            key={index}
            ref={(el) => (mediaRefs.current[index] = el)}
            className={styles["media-container"]}
            style={{ width: `${width}px`, left: `${left}px`, position: "relative" }}
          >
            <RenderMedia medium={medium} enableFullscreen />
          </div>
        );
      })}
    </motion.div>
  );
}

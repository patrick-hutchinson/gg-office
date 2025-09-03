import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { motion, useMotionValue, wrap, useMotionValueEvent } from "framer-motion";

import RenderMedia from "@/components/RenderMedia/RenderMedia";
import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";

import styles from "../styles/Research.module.css";

export default function Column({ columnNumber, columnCount }) {
  const mediaRefs = useRef([]);
  const virtualScroll = useMotionValue(0);

  const { research } = useContext(DataContext);

  const { isMobile } = useContext(StateContext);

  const mobileDeltaY = useMotionValue(0); // motion value instead of state

  const [totalHeight, setTotalHeight] = useState(0);

  // Compute the totalHeight of the column once
  useEffect(() => {
    if (!mediaRefs.current) return;

    let sum = 0;
    mediaRefs.current.forEach((medium) => {
      sum += medium.getBoundingClientRect().height;
    });

    const gap = mediaRefs.current.length * 70;
    setTotalHeight((sum + gap) / 2);
  }, []);

  // Compute Virtual Scroll Value on Desktop, using the computed deltaY value
  useMotionValueEvent(mobileDeltaY, "change", (deltaY) => {
    if (!totalHeight) return;

    const current = virtualScroll.get();
    const resistance = 0.5;

    // Alternate directions for columns if desired
    const newY = columnNumber % 2 ? current - deltaY * resistance : current + deltaY * resistance;

    virtualScroll.set(wrap(-totalHeight, 0, newY));
  });

  // Compute Virtual Scroll Value on Desktop
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

  useEffect(() => {
    const lastY = { current: 0 };
    const velocity = { current: 0 };
    const isDragging = { current: false };

    const handleTouchStart = (e) => {
      lastY.current = e.touches[0].clientY;
      isDragging.current = true;
      velocity.current = 0; // reset velocity on new drag
    };

    // This function computes a deltaY value based on touchstart, move and end
    const handleTouchMove = (e) => {
      if (!isDragging.current) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastY.current;

      // Update motion value like scroll
      mobileDeltaY.set(deltaY);

      // Store velocity for inertia
      velocity.current = deltaY;

      lastY.current = currentY;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;

      // Apply momentum/inertia
      let v = velocity.current;

      const decay = () => {
        if (Math.abs(v) < 0.1) return; // stop when velocity is low

        mobileDeltaY.set(v); // apply delta for this frame
        v *= 0.95; // decay factor for natural slowdown

        requestAnimationFrame(decay);
      };

      requestAnimationFrame(decay);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useMotionValueEvent(mobileDeltaY, "change", (value) => {
    console.log("mobileDeltaY changed:", value);
  });

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
    <motion.div className={styles["column"]} style={{ y: virtualScroll }}>
      {duplicatedItems.map((medium, index) => {
        const width = widths[index % rearrangedItems.length];
        const left = leftValues[index % rearrangedItems.length];
        return (
          <div
            key={index}
            ref={(el) => (mediaRefs.current[index] = el)}
            className={styles["media-container"]}
            style={{
              width: `${width}px`,
              // left: `${left}px`,
              position: "relative",
            }}
          >
            <RenderMedia medium={medium} enableFullscreen />
          </div>
        );
      })}
    </motion.div>
  );
}

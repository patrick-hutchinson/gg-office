"use client";

import { useState, useEffect, useContext, useRef } from "react";

import Rellax from "rellax";
import { useLenis } from "@studio-freight/react-lenis";
import Loading from "../../assets/components/Loading/Loading";

import RenderMedia from "../../assets/utils/RenderMedia";

import styles from "./styles/Research.module.css";
import { GlobalDataContext } from "../../assets/context/GlobalDataContext";
import { GlobalStateContext } from "../../assets/context/GlobalStateContext";

export default function Research() {
  const { research } = useContext(GlobalDataContext);
  const { isMobile } = useContext(GlobalStateContext);

  const imagesRef = useRef([]);

  const containerRef = useRef(undefined);

  const lenis = useLenis();

  let Images = () => {
    useEffect(() => {
      isMobile ? 0 : new Rellax(".rellax");
    }, []);

    return (
      <div className={`${styles["container"]}`}>
        {research[0].imagegallery.map((image, index) => {
          const randomSpeed = Math.random() * 3 - 6;
          const randomX = isMobile ? 0 : Math.random() * 50;
          const randomY = isMobile ? 0 : Math.random() * 200 - 100;

          let isLeft = index % 3 === 0;
          let isRight = index % 3 === 2;

          const translateY = index < 4 ? `${randomY}px` : "0px";
          const translateX = isLeft ? `${randomX}px` : isRight ? `-${randomX}px` : "0px";

          return (
            <div
              className={`${styles["image-container"]} rellax`}
              data-rellax-speed={randomSpeed}
              key={index}
              style={{
                transform: `translateY(${translateY}) translateX(${translateX})`,
              }}
              ref={(el) => {
                if (el) imagesRef.current[index] = el;
              }}
            >
              <RenderMedia medium={image} />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      console.log("scrolling");
      const yValues = imagesRef.current.map((el) => {
        if (!el) return 0;

        const transform = el.style.transform;
        const offsetTop = el.offsetTop;
        const height = el.offsetHeight;

        let translateY = 0;

        if (transform?.includes("translate3d")) {
          const match = transform.match(/translate3d\(\s*([-0-9.]+)px,\s*([-0-9.]+)px,\s*([-0-9.]+)px\)/);

          if (match) {
            const [, , y] = match.map(parseFloat);
            translateY = y;
          }
        }

        return offsetTop + height + translateY;
      });

      const maxVisualBottom = Math.max(...yValues);

      if (containerRef.current) {
        containerRef.current.style.minHeight = `${maxVisualBottom}px`;
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  if (!research) return <Loading />;

  return (
    <div ref={containerRef} className={styles["research-container"]}>
      <Images />
    </div>
  );
}

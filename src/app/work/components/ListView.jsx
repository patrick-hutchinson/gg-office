"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import styles from "./styles/ListView.module.css";

import ScrollText from "../.././../assets/components/ScrollText";

import RenderMedia from "../../../assets/utils/RenderMedia";
import Loading from "../../../assets/components/Loading/Loading";

import { useLenis } from "@studio-freight/react-lenis";

import { GlobalStateContext } from "../../../assets/context/GlobalStateContext";

export default function ListView({ work, selectedFilters, activeView }) {
  const { isMobile } = useContext(GlobalStateContext);

  const mediaRefs = useRef({});

  const previewWrapperRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef(null);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const updateScroll = ({ scroll }) => {
      scrollYRef.current = scroll;
      updatePosition();
    };

    lenis.on("scroll", updateScroll);
    return () => lenis.off("scroll", updateScroll);
  }, [lenis]);

  const updatePosition = () => {
    if (previewWrapperRef.current) {
      const x = cursorRef.current.x;
      const y = cursorRef.current.y + scrollYRef.current;
      previewWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseMove = (e) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        updatePosition();
        animationFrameRef.current = null;
      });
    }
  };

  const setMediaRef = (id) => (el) => {
    if (el) {
      mediaRefs.current[id] = el;
    }
  };

  const showMedia = (project) => {
    Object.values(mediaRefs.current).forEach((ref) => {
      if (ref) ref.style.visibility = "hidden";
    });

    const el = mediaRefs.current[project.thumbnail._id];

    if (el) el.style.visibility = "visible";

    requestAnimationFrame(updatePosition);
  };

  const hideMedia = () => {
    Object.values(mediaRefs.current).forEach((ref) => {
      if (ref) ref.style.visibility = "hidden";
    });

    requestAnimationFrame(updatePosition);
  };

  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <Loading />;

  const Categories = ({ project }) => {
    const categoryText = project.filtering.map((f) => f.title).join(", ");
    return (
      <div className={styles.categories}>
        <div className={styles["categories-inner"]}>{categoryText}</div>
      </div>
    );
  };

  const ImagePreview = () => {
    return (
      <div
        className={styles["preview-wrapper"]}
        ref={previewWrapperRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "translate(0, 0)",
          pointerEvents: "none",
        }}
      >
        {work.map((project, index) => (
          <div
            key={index}
            ref={setMediaRef(project.thumbnail._id)}
            className={styles["preview-wrapper-inner"]}
            style={{
              visibility: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <RenderMedia medium={project.thumbnail} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.projectwrapper} onMouseMove={handleMouseMove}>
        <ul className={`${styles.listview} ${activeView === "List View" ? "visible" : "hidden"}`}>
          <ul className={styles.infotitles}>
            <li className={styles.name}>Name</li>
            {!isMobile && <li className={styles.category}>Category</li>}
            <li className={styles.year}>Year</li>
          </ul>
          {work.map((project, index) => {
            if (!projectMatchesFilter(project)) return null;
            return (
              project.slug && (
                <Link href={`/work/${project.slug.current}`} key={index}>
                  <li className={styles.project} onMouseEnter={(e) => showMedia(project)} onMouseLeave={hideMedia}>
                    <div className={styles.name}>
                      <ScrollText string={project.name} />
                    </div>
                    <Categories project={project} />
                    <div className={styles.year}>{project.year}</div>
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      </div>
      {!isMobile && <ImagePreview />}
    </>
  );
}

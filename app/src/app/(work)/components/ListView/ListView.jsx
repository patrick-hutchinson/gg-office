"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import styles from "./ListView.module.css";

import ScrollText from "@/components/ScrollText";

import Media from "@/components/Media/Media";
import Loading from "@/components/Loading/Loading";
import SanityPreviewFallback, { hasSanityValue, isSanityPreviewEnvironment } from "@/components/SanityPreviewFallback";

import { StateContext } from "../../../../context/StateContext";
import { DataContext } from "../../../../context/DataContext";

export default function ListView({ selectedFilters, activeView }) {
  const { isMobile } = useContext(StateContext);
  const { work } = useContext(DataContext);

  const mediaRefs = useRef({});

  const previewWrapperRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const el = document.querySelector("#content");

    const handleScroll = (e) => {
      scrollYRef.current = el.scrollTop;
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update ImagePreview Position every frame
  useEffect(() => {
    let animationFrame;

    const tick = () => {
      updatePosition();
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const updatePosition = () => {
    if (previewWrapperRef.current) {
      const imageWidth = previewWrapperRef.current.getBoundingClientRect().width;
      const imageHeight = previewWrapperRef.current.getBoundingClientRect().width; // 👈 careful: you probably meant height here?

      const x = cursorRef.current.x - imageWidth / 2;
      let y = cursorRef.current.y + scrollYRef.current - imageHeight / 2 - 100;

      // clamp against the projectwrapper bottom
      const wrapper = document.querySelector(`.${styles.projectwrapper}`);
      if (wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect();
        const maxY = wrapperRect.bottom + scrollYRef.current - imageHeight;
        y = Math.min(y, maxY);
      }

      previewWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseMove = (e) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };
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

    const el = mediaRefs.current[project.thumbnail?._id || project.slug?.current || project.name];

    if (el) el.style.visibility = "visible";

    requestAnimationFrame(updatePosition);
  };

  const hideMedia = () => {
    Object.values(mediaRefs.current).forEach((ref) => {
      if (ref) ref.style.visibility = "hidden";
    });

    requestAnimationFrame(updatePosition);
  };

  const projectMatchesFilter = (project) => {
    const filtering = Array.isArray(project.filtering) ? project.filtering : [];
    if (filtering.length === 0) return isSanityPreviewEnvironment;
    return filtering.some((filter) => selectedFilters.includes(filter.title));
  };

  if (!work) return <Loading />;

  const Categories = ({ project }) => {
    const filters = Array.isArray(project.filtering) ? project.filtering.filter((filter) => hasSanityValue(filter?.title)) : [];
    const categoryText = filters.map((f) => f.title).join(", ");
    return (
      <div className={styles.categories}>
        <div className={styles["categories-inner"]}>
          {hasSanityValue(categoryText) ? categoryText : <SanityPreviewFallback fieldTitle="project filtering" />}
        </div>
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
            ref={setMediaRef(project.thumbnail?._id || project.slug?.current || project.name || index)}
            className={styles["preview-wrapper-inner"]}
            style={{
              visibility: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <Media medium={project.thumbnail} enableFullscreen={false} fieldTitle="project thumbnail" />
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
              (project.slug || isSanityPreviewEnvironment) && (
                <Link href={project.slug?.current ? `/work/${project.slug.current}` : "#"} key={index}>
                  <li className={styles.project} onMouseEnter={(e) => showMedia(project)} onMouseLeave={hideMedia}>
                    <div className={styles.name}>
                      {hasSanityValue(project.name) ? (
                        <ScrollText string={project.name} activeView={activeView} />
                      ) : (
                        <SanityPreviewFallback fieldTitle="project name" />
                      )}
                    </div>
                    <Categories project={project} />
                    <div className={styles.year}>
                      {hasSanityValue(project.year) ? project.year : <SanityPreviewFallback fieldTitle="project year" />}
                    </div>
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      </div>
      {!isMobile && activeView === "List View" && (
        <div style={{ position: "relative", width: "100%", height: "calc(20vw * (4 / 5))" }}></div>
      )}
      {!isMobile && <ImagePreview />}
    </>
  );
}

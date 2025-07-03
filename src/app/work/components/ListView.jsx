"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import styles from "./styles/ListView.module.css";

import RenderMedia from "../../../assets/utils/RenderMedia";
import Loading from "../../../assets/components/Loading/Loading";

import { GlobalStateContext } from "../../../assets/context/GlobalStateContext";

export default function ListView({ work, selectedFilters, activeView }) {
  const { isMobile } = useContext(GlobalStateContext);
  let [hoverImage, setHoverImage] = useState({ src: null, extension: null });

  const cursorPositionRef = useRef({ left: 0, top: 0 });
  const animationFrameRef = useRef(null);

  let previewWrapperRef = useRef(null);

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <Loading />; // Early return if there's no data

  let Categories = ({ project }) => {
    const categoryText = project.filtering.map((f) => f.title).join(", ");

    return (
      <div className={styles.categories}>
        <div className={styles["categories-inner"]}>{categoryText}</div>
      </div>
    );
  };

  function handleMouseEnter(e, project) {
    setHoverImage(project.thumbnail);
  }

  function handleMouseLeave() {
    setHoverImage(null);
  }

  const handleMouseMove = (e) => {
    cursorPositionRef.current = { left: e.pageX, top: e.pageY };

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (previewWrapperRef.current) {
          const { left, top } = cursorPositionRef.current;
          previewWrapperRef.current.style.transform = `translate(${left}px, ${top}px)`;
        }
        animationFrameRef.current = null;
      });
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (previewWrapperRef.current && cursorPositionRef.current.left !== null) {
        // Get viewport-relative coordinates by subtracting scroll offsets
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate position relative to viewport
        const left = cursorPositionRef.current.left - scrollLeft;
        const top = cursorPositionRef.current.top + scrollTop;

        previewWrapperRef.current.style.transform = `translate(${left}px, ${top}px)`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let ImagePreview = () => (
    <div
      className={`${styles["preview-wrapper"]}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${cursorPositionRef.current.left}px, ${cursorPositionRef.current.top}px)`,
        pointerEvents: "none",
        visibility: hoverImage ? "visible" : "hidden",
      }}
      ref={previewWrapperRef}
    >
      <RenderMedia medium={hoverImage} />
    </div>
  );

  return (
    <>
      <div
        className={`${styles.projectwrapper}`}
        onMouseMove={(e) => {
          handleMouseMove(e);
        }}
        onScroll={(e) => {
          handleScroll(e);
        }}
      >
        <ul className={`${styles.listview} ${activeView === "List View" ? "visible" : "hidden"}`}>
          <ul className={`${styles.infotitles}`}>
            <li className={`${styles.name}`}>Name</li>
            <li className={`${styles.category}`}>Category</li>
            <li className={`${styles.year}`}>Year</li>
          </ul>
          {work.map((project, index) => {
            if (!projectMatchesFilter(project)) return null; // Early return if project should not render

            return (
              project.slug && (
                <Link href={`/work/${project.slug.current}`} key={index}>
                  <li
                    className={`${styles.project}`}
                    onMouseEnter={(e) => handleMouseEnter(e, project)}
                    key={index}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className={`${styles.name}`}>{project.name}</div>

                    <Categories project={project} />

                    <div className={`${styles.year}`}>{project.year}</div>
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

"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import styles from "./styles/ListView.module.css";

import RenderMedia from "../../../assets/utils/RenderMedia";
import Loading from "../../../assets/components/Loading/Loading";

import { useLenis } from "@studio-freight/react-lenis";

import { GlobalStateContext } from "../../../assets/context/GlobalStateContext";

export default function ListView({ work, selectedFilters, activeView }) {
  const { isMobile } = useContext(GlobalStateContext);
  const [hoverImage, setHoverImage] = useState(null);

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

  const handleMouseEnter = (e, project) => {
    setHoverImage(project.thumbnail);

    // Force an immediate update, using latest mouse position
    requestAnimationFrame(updatePosition);
  };

  const handleMouseLeave = () => {
    setHoverImage(null);

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
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translate(0, 0)`,
          pointerEvents: "none",
          visibility: hoverImage ? "visible" : "hidden",
        }}
        ref={previewWrapperRef}
      >
        <RenderMedia medium={hoverImage} />
      </div>
    );
  };

  return (
    <>
      <div className={styles.projectwrapper} onMouseMove={handleMouseMove}>
        <ul className={`${styles.listview} ${activeView === "List View" ? "visible" : "hidden"}`}>
          <ul className={styles.infotitles}>
            <li className={styles.name}>Name</li>
            <li className={styles.category}>Category</li>
            <li className={styles.year}>Year</li>
          </ul>
          {work.map((project, index) => {
            if (!projectMatchesFilter(project)) return null;
            return (
              project.slug && (
                <Link href={`/work/${project.slug.current}`} key={index}>
                  <li
                    className={styles.project}
                    onMouseEnter={(e) => handleMouseEnter(e, project)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    <div className={styles.name}>{project.name}</div>
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

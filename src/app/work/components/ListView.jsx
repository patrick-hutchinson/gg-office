"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import styles from "./styles/ListView.module.css";

import RenderMedia from "../../../assets/utils/RenderMedia";
import Loading from "../../../assets/components/Loading/Loading";

export default function ListView({ work, selectedFilters, activeView }) {
  let [hoverImage, setHoverImage] = useState({ src: null, extension: null });
  const cursorPositionRef = useRef({ left: null, top: null });

  let previewWrapperRef = useRef(null);

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <Loading />; // Early return if there's no data

  let Categories = ({ project }) => {
    return (
      <ul className={`${styles.categories}`}>
        {project.filtering.map((filter, index) => (
          <li className={`${styles.category}`} key={index}>
            {filter.title}
            {index < project.filtering.length - 1 && ","}
          </li>
        ))}
      </ul>
    );
  };

  function handleMouseEnter(e, project) {
    if (!project.thumbnail) return;

    const sameImage =
      hoverImage?.type === project.thumbnail?.type &&
      hoverImage?.url === project.thumbnail?.url &&
      hoverImage?.playbackId === project.thumbnail?.playbackId;

    if (!sameImage) {
      setHoverImage(project.thumbnail);
    }

    previewWrapperRef.current.style.visibility = "visible";
  }

  function handleMouseLeave() {
    previewWrapperRef.current.style.visibility = "hidden";
  }

  let ImagePreview = () => (
    <div
      className={`${styles["preview-wrapper"]}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(0, 0)`, // This will be overwritten on mouse move
        pointerEvents: "none",
      }}
      ref={previewWrapperRef}
    >
      <RenderMedia medium={hoverImage} />
    </div>
  );

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursorPositionRef.current = { left: x, top: y };

    if (previewWrapperRef.current) {
      previewWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <>
      <div
        className={`${styles.projectwrapper}`}
        onMouseMove={(e) => {
          handleMouseMove(e);
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
      {hoverImage ? <ImagePreview /> : <div></div>}
    </>
  );
}

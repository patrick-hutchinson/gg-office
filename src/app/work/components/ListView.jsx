"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import styles from "./styles/ListView.module.css";

import RenderMedia from "../../../assets/utils/RenderMedia";

export default function ListView({ work, selectedFilters, activeView }) {
  let [hoverImage, setHoverImage] = useState({ src: null, extension: null });

  let previewImageRef = useRef(null);

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <p>Loading... </p>; // Early return if there's no data

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

    setHoverImage(project.thumbnail);
    previewImageRef.current.style.top = `${e.clientY - 100}px`;

    previewImageRef.current.style.display = "unset";
  }

  function handleMouseLeave() {
    previewImageRef.current.style.display = "none";
  }

  let ImagePreview = (
    <div className={`${styles.imagepreview}`}>
      <div className={`${styles["media-wrapper"]}`} ref={previewImageRef}>
        <RenderMedia medium={hoverImage} />;
      </div>
    </div>
  );

  return (
    <div className={`${styles.projectwrapper}`}>
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
      {hoverImage ? ImagePreview : <></>}
    </div>
  );
}

import React, { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/ImageView.module.css"; // Updated import for CSS modules
import { Link } from "react-router-dom";

import { getFileSource } from "../../../utils/getFileSource";
import { renderFile } from "../../../utils/renderFile";

export default function ImageView({ work, selectedFilters, activeView }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <p>Loading...</p>; // Early return if there's no data

  let Categories = ({ project }) => {
    return (
      <ul className={styles["project-categories"]}>
        {project.filtering.map((filter, index) => {
          return (
            <li className={`${styles.category}`} key={index}>
              {filter.title}
            </li>
          );
        })}
      </ul>
    );
  };

  let Media = ({ project }) => {
    const fileInfo = getFileSource(project.thumbnail);
    return renderFile(fileInfo);
  };

  return (
    <div className={`${styles.projectwraper}`}>
      <div className={`${styles.imageview} ${activeView === "Image View" ? "visible" : "hidden"}`}>
        {work.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <Link className={styles.project} to={`/work/${project.slug.current}`} key={index}>
              <div className={`${styles["project-front"]}`}>
                <Media project={project} />
              </div>

              <div className={`${styles["project-details-outer"]}`}>
                <div className={styles["project-name"]}>{project.name}</div>
                <Categories project={project} />
                <div className={styles["project-year"]}>{project.year}</div>
                <div className={`${styles["project-details-inner"]}`}>
                  <div className={`${styles["project-details"]}`}></div>
                </div>
                {/* <div className={`${styles["project-details-blackout"]}`}></div> */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

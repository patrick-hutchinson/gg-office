import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/MoreProjects.module.css";
import { getFileSource } from "../../../utils/getFileSource";
import { renderFile } from "../../../utils/renderFile";

export default function MoreProjects({ work }) {
  const moreprojectsRef = useRef(null);

  function handlePan(direction) {
    if (direction === "left") {
      moreprojectsRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
    if (direction === "right") {
      moreprojectsRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  }

  let Media = ({ project }) => {
    const fileInfo = getFileSource(project);
    return renderFile(fileInfo);
  };

  let ProjectList = (
    <div className={styles["moreprojects-wrapper"]}>
      <div className={styles["moreprojects"]} ref={moreprojectsRef}>
        {work.map((project, index) => {
          return (
            <Link to={`/work/${project.slug.current}`} key={index}>
              <Media project={project.coverimage} />
            </Link>
          );
        })}
      </div>

      <div className={`${styles["navigation-wrapper"]}`}>
        <div className={`${styles.panButton}`} onClick={() => handlePan("left")}>
          ←
        </div>
        <div className={`${styles.panButton}`} onClick={() => handlePan("right")}>
          →
        </div>
      </div>
    </div>
  );
  return (
    <section>
      <h2>More Projects</h2>
      {ProjectList}
    </section>
  );
}

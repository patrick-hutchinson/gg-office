import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/MoreProjects.module.css";
import { getFileSource } from "../../../utils/getFileSource";
import RenderFile from "../../../utils/renderFile";

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

  let ProjectList = (
    <div className={styles["moreprojects-wrapper"]}>
      <div className={styles["moreprojects"]} ref={moreprojectsRef}>
        {work.map((project, index) => {
          return (
            project.slug && (
              <Link to={`/work/${project.slug.current}`} key={index}>
                {project.thumbnail && <RenderFile source={getFileSource(project.thumbnail, { width: 800 })} />}
              </Link>
            )
          );
        })}
      </div>

      <div className={`${styles["navigation-wrapper"]}`}>
        <div className={`${styles.panButton}`} onClick={() => handlePan("left")}>
          <img src="/assets/images/arrow-left.svg" alt="arrow-left" />
        </div>
        <div className={`${styles.panButton}`} onClick={() => handlePan("right")}>
          <img src="/assets/images/arrow-right.svg" alt="arrow-left" />
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

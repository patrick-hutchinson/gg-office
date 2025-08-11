"use client";

import { useRef } from "react";
import Link from "next/link";

import styles from "./styles/MoreProjects.module.css";

import RenderMedia from "../../../../assets/components/RenderMedia";

export default function MoreProjects({ work }) {
  const moreprojectsRef = useRef(null);

  function handlePan(direction) {
    const scrollAmount = window.innerWidth * 0.9;

    if (direction === "left") {
      moreprojectsRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
    if (direction === "right") {
      moreprojectsRef.current.scrollBy({
        left: scrollAmount,
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
              <Link href={`/work/${project.slug.current}`} key={project.slug.current}>
                {project.thumbnail && <RenderMedia medium={project.thumbnail} />}
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

"use client";

import { useRef } from "react";
import Link from "next/link";

import styles from "./styles/MoreProjects.module.css";

import RenderMedia from "@/components/RenderMedia/RenderMedia";
import Icon from "@/components/Icon";

export default function MoreProjects({ work, currentProject }) {
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

  const currentIndex = work.findIndex((project) => project.slug.current === currentProject.slug.current);

  const rearrangedWork = [...work.slice(currentIndex + 1), ...work.slice(0, currentIndex), work[currentIndex]];

  let ProjectList = (
    <div className={styles["moreprojects-wrapper"]}>
      <div className={styles["moreprojects"]} ref={moreprojectsRef}>
        {rearrangedWork.map((project, index) => {
          return (
            project.slug && (
              <Link href={`/work/${project.slug.current}`} key={index}>
                {project.thumbnail && <RenderMedia medium={project.thumbnail} enableFullscreen={false} />}
              </Link>
            )
          );
        })}
      </div>

      <div className={`${styles["navigation-wrapper"]}`}>
        <div className={`${styles.panButton} button active`} onClick={() => handlePan("left")}>
          <Icon path={"/assets/images/arrow-left.svg"} />
        </div>
        <div className={`${styles.panButton} button active`} onClick={() => handlePan("right")}>
          <Icon path={"/assets/images/arrow-right.svg"} />
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

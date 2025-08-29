"use client";

import { useRef, useState, useContext } from "react";
import Link from "next/link";

import styles from "./styles/MoreProjects.module.css";

import RenderMedia from "@/components/RenderMedia/RenderMedia";
import Icon from "@/components/Icon";
import { StateContext } from "@/context/StateContext";

export default function MoreProjects({ work, currentProject }) {
  const { isMobile } = useContext(StateContext);
  const moreprojectsRef = useRef(null);

  const mouseDownRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (isMobile) return;

    mouseDownRef.current = true;
    setIsDragging(false); // reset
    setStartX(e.pageX - moreprojectsRef.current.offsetLeft);
    setScrollLeft(moreprojectsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    mouseDownRef.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = (e) => {
    if (isMobile) return;

    mouseDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;

    if (!mouseDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - moreprojectsRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) setIsDragging(true); // detect drag
    moreprojectsRef.current.scrollLeft = scrollLeft - walk;
  };

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
      <div
        className={styles["moreprojects"]}
        ref={moreprojectsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {rearrangedWork.map((project, index) => {
          return (
            project.slug && (
              <Link
                href={`/work/${project.slug.current}`}
                key={index}
                onClick={(e) => {
                  if (isDragging && !isMobile) e.preventDefault(); // cancel click if it was a drag
                }}
                onDragStart={!isMobile ? (e) => e.preventDefault() : undefined}
              >
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
      <h3 style={{ marginBottom: "var(--margin)" }}>More Projects</h3>
      {ProjectList}
    </section>
  );
}

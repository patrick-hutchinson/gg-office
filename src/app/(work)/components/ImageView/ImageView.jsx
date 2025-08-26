import { useEffect, useContext } from "react";

import styles from "./ImageView.module.css"; // Updated import for CSS modules
import Link from "next/link";

import Loading from "@/components/Loading/Loading";
import RenderMedia from "@/components/RenderMedia/RenderMedia";

import { DataContext } from "../../../../context/DataContext";

export default function ImageView({ selectedFilters, activeView }) {
  // Helper function to determine if a project should be rendered
  const { work } = useContext(DataContext);

  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <Loading />; // Early return if there's no data

  return (
    <div className={`${styles.imageview} ${activeView === "Image View" ? "visible" : "hidden"}`}>
      {work.map((project, index) => {
        if (!projectMatchesFilter(project)) return null; // Early return if project should not render

        return (
          project.slug && (
            <Link className={styles.project} href={`/work/${project.slug.current}`} key={project.slug.current}>
              <div className={`${styles["project-front"]}`}>
                {project.thumbnail && <RenderMedia medium={project.thumbnail} enableFullscreen={false} />}
              </div>

              <div className={`${styles["project-details-outer"]}`}>
                <div className={styles["project-name"]}>{project.name}</div>
                {/* <Categories project={project} /> */}
                <div className={styles["project-year"]}>{project.year}</div>
                <div className={`${styles["project-details-inner"]}`}>
                  <div className={`${styles["project-details"]}`}></div>
                </div>
              </div>
            </Link>
          )
        );
      })}
    </div>
  );
}

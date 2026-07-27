import { useEffect, useContext } from "react";

import styles from "./ImageView.module.css"; // Updated import for CSS modules
import Link from "next/link";

import Loading from "@/components/Loading/Loading";
import Media from "@/components/Media/Media";
import SanityPreviewFallback, { hasSanityValue, isSanityPreviewEnvironment } from "@/components/SanityPreviewFallback";

import { DataContext } from "../../../../context/DataContext";

export default function ImageView({ selectedFilters, activeView }) {
  // Helper function to determine if a project should be rendered
  const { work } = useContext(DataContext);

  const projectMatchesFilter = (project) => {
    const filtering = Array.isArray(project.filtering) ? project.filtering : [];
    if (filtering.length === 0) return isSanityPreviewEnvironment;
    return filtering.some((filter) => selectedFilters.includes(filter.title));
  };

  if (!work) return <Loading />; // Early return if there's no data

  return (
    <div className={`${styles.imageview} ${activeView === "Image View" ? "visible" : "hidden"}`}>
      {work.map((project, index) => {
        return (
          (project.slug || isSanityPreviewEnvironment) && (
            <Link
              className={`${styles.project} ${projectMatchesFilter(project) ? "" : styles.hidden}`}
              href={project.slug?.current ? `/work/${project.slug.current}` : "#"}
              key={project.slug?.current || index}
            >
              <div className={`${styles["project-front"]}`}>
                <Media medium={project.thumbnail} enableFullscreen={false} fieldTitle="project thumbnail" />
              </div>

              <div className={`${styles["project-details-outer"]}`}>
                <div className={styles["project-name"]}>
                  {hasSanityValue(project.name) ? project.name : <SanityPreviewFallback fieldTitle="project name" />}
                </div>
                {/* <Categories project={project} /> */}
                <div className={styles["project-year"]}>
                  {hasSanityValue(project.year) ? project.year : <SanityPreviewFallback fieldTitle="project year" />}
                </div>
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

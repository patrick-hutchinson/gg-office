import styles from "./styles/ImageView.module.css"; // Updated import for CSS modules
import Link from "next/link";

import RenderMedia from "../../../assets/utils/RenderMedia";

export default function ImageView({ work, selectedFilters, activeView }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.filtering.some((filter) => selectedFilters.includes(filter.title));

  if (!work) return <p>Loading...</p>; // Early return if there's no data

  console.log("new work:", work);

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

  return (
    <div className={`${styles.projectwraper}`}>
      <div className={`${styles.imageview} ${activeView === "Image View" ? "visible" : "hidden"}`}>
        {work.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            project.slug && (
              <Link className={styles.project} href={`/work/${project.slug.current}`} key={index}>
                <div className={`${styles["project-front"]}`}>
                  {project.thumbnail && <RenderMedia medium={project.thumbnail} />}
                </div>

                <div className={`${styles["project-details-outer"]}`}>
                  <div className={styles["project-name"]}>{project.name}</div>
                  <Categories project={project} />
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
    </div>
  );
}

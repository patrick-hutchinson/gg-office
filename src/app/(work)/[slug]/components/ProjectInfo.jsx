import { PortableText } from "@portabletext/react";

import styles from "./styles/ProjectInfo.module.css";

export default function ProjectInfo({ project }) {
  const Categories = () => {
    return (
      <ul className={styles.categories}>
        {project.filtering.map((filter, index) => (
          <li className={styles.category} key={index}>
            {filter.title}
            {index < project.filtering.length - 1 && ","}&nbsp;
          </li>
        ))}
      </ul>
    );
  };
  return (
    <section className={`${styles.projectInfo}`}>
      <h1>{project.name}</h1>
      <div className={`${styles["project-specifics"]}`}>
        <div className={`${styles["categories-wrapper"]}`}>
          <div>{project.year}</div>
        </div>
        <Categories />
        {project.description && (
          <div className={styles.description}>
            <PortableText value={project.description} />
          </div>
        )}
      </div>
    </section>
  );
}

import { PortableText } from "@portabletext/react";

import styles from "./styles/ProjectInfo.module.css";
import SanityPreviewFallback, { SanityPreviewValue, hasSanityValue } from "@/components/SanityPreviewFallback";

export default function ProjectInfo({ project }) {
  const Categories = () => {
    const filters = Array.isArray(project.filtering) ? project.filtering.filter((filter) => hasSanityValue(filter?.title)) : [];

    if (filters.length === 0) return <SanityPreviewFallback as="ul" className={styles.categories} fieldTitle="filtering" />;

    return (
      <ul className={styles.categories}>
        {filters.map((filter, index) => (
          <li className={styles.category} key={index}>
            {filter.title}
            {index < filters.length - 1 && ","}&nbsp;
          </li>
        ))}
      </ul>
    );
  };
  return (
    <section className={`${styles.projectInfo}`}>
      <h1>
        <SanityPreviewValue value={project.name} fieldTitle="project name" />
      </h1>
      <div>
        <div className={`${styles["categories-wrapper"]}`}>
          <div>
            <SanityPreviewValue value={project.year} fieldTitle="project year" />
          </div>
        </div>
        <Categories />
        <div className={styles.description}>
          {hasSanityValue(project.description) ? (
            <PortableText value={project.description} />
          ) : (
            <SanityPreviewFallback fieldTitle="project description" />
          )}
        </div>
      </div>
    </section>
  );
}

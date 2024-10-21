import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/ImageView.module.css"; // Updated import for CSS modules
import { Link } from "react-router-dom";

export default function ImageView({ data, selectedFilters }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.category.some((category) => selectedFilters.includes(category));

  if (!data) return null; // Early return if there's no data

  return (
    <div className={`${styles.projectwraper}`}>
      <div className={`${styles.imageview}`}>
        {data.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <Link to={`/work/${project.name}`} key={index}>
              <a href="#" className={styles.project} key={index}>
                <img src="/assets/images/placeholder.jpg" alt="project" />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

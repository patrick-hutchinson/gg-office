import React from "react";

import { useEffect, useState, useRef } from "react";

import styles from "./styles/ListView.module.css";

export default function ListView({ data, selectedFilters }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.category.some((category) => selectedFilters.includes(category));

  if (!data) return null; // Early return if there's no data

  return (
    <div className={`${styles.projectwrapper}`}>
      <ul className={`${styles.listview}`}>
        <ul className={`${styles.infotitles}`}>
          <li className={`${styles.name}`}>Name</li>
          <li className={`${styles.category}`}>Category</li>
          <li className={`${styles.year}`}>Year</li>
        </ul>
        {data.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <li className={`${styles.project}`} key={index}>
              <div className={`${styles.name}`}>{project.name}</div>

              <ul className={`${styles.categories}`}>
                {project.category.map((category, categoryIndex) => (
                  <li className={`${styles.category}`} key={categoryIndex}>
                    {category}
                  </li>
                ))}
              </ul>

              <div className={`${styles.year}`}>{project.year}</div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.imagepreview}`}>
        <img src="/assets/images/placeholder.jpg"></img>
      </div>
    </div>
  );
}

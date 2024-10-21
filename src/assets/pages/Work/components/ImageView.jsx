import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/ImageView.module.css"; // Updated import for CSS modules
import { Link } from "react-router-dom";

import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function ImageView({ work, selectedFilters }) {
  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.categories.some((category) => selectedFilters.includes(category));

  if (!work) return null; // Early return if there's no data

  return (
    <div className={`${styles.projectwraper}`}>
      <div className={`${styles.imageview}`}>
        {work.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <Link className={styles.project} to={`/work/${project.slug.current}`} key={index}>
              <img src={`${urlFor(project.coverimage)}`} alt="project" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/ImageView.module.css"; // Updated import for CSS modules
import { Link } from "react-router-dom";

import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function ImageView({ work, selectedFilters }) {
  const builder = imageUrlBuilder(sanityClient);

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.categories.some((category) => selectedFilters.includes(category));

  if (!work) return null; // Early return if there's no data

  console.log(work, "ww");

  let Categories = ({ project }) => {
    return (
      <ul className={`${styles.categories}`}>
        {project.categories.map((category, categoryIndex) => (
          <li className={`${styles.category}`} key={categoryIndex}>
            {category}
          </li>
        ))}
      </ul>
    );
  };

  function videoSource(source) {
    let projectID = builder.options.projectId;
    let dataset = builder.options.dataset;

    const [_prefix, fileId, extension] = source.asset._ref.split("-");

    return `https://cdn.sanity.io/files/${projectID}/${dataset}/${fileId}.${extension}`;
  }

  function imageSource(source) {
    let projectID = builder.options.projectId;
    let dataset = builder.options.dataset;

    const [_prefix, fileId, resolution, extension] = source.asset._ref.split("-");

    return `https://cdn.sanity.io/images/${projectID}/${dataset}/${fileId}-${resolution}.${extension}`;
  }

  console.log(work, "w");

  return (
    <div className={`${styles.projectwraper}`}>
      <div className={`${styles.imageview}`}>
        {work.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <Link className={styles.project} to={`/work/${project.slug.current}`} key={index}>
              {project.coverimage && project.coverimage._type === "image" ? (
                <img src={`${imageSource(project.coverimage)}`} alt="project" />
              ) : (
                <video autoPlay loop muted playsInline>
                  <source src={`${videoSource(project.coverimage)}`} />
                </video>
              )}

              <div className={`${styles["project-details"]}`}>
                <div className="">{project.name}</div>
                <Categories project={project} />
                <div className="">{project.year}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

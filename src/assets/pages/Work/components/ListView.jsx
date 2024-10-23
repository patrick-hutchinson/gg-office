import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

import styles from "./styles/ListView.module.css";

export default function ListView({ work, selectedFilters }) {
  let [hoverImage, setHoverImage] = useState(null);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.categories.some((category) => selectedFilters.includes(category));

  if (!work) return null; // Early return if there's no data

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

  function handleMouseEnter(project) {
    // console.log(project.coverimage, "coverimage");
    setHoverImage(urlFor(project.coverimage));
  }

  let ImagePreview = () => {
    return (
      <div className={`${styles.imagepreview}`}>
        <img src={hoverImage}></img>
      </div>
    );
  };

  return (
    <div className={`${styles.projectwrapper}`}>
      <ul className={`${styles.listview}`}>
        <ul className={`${styles.infotitles}`}>
          <li className={`${styles.name}`}>Name</li>
          <li className={`${styles.category}`}>Category</li>
          <li className={`${styles.year}`}>Year</li>
        </ul>
        {work.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <Link to={`/work/${project.slug.current}`} key={index}>
              {/* <img src="/assets/images/placeholder.jpg" alt="project" /> */}

              <li className={`${styles.project}`} onMouseEnter={() => handleMouseEnter(project)} key={index}>
                <div className={`${styles.name}`}>{project.name}</div>

                <Categories project={project} />

                <div className={`${styles.year}`}>{project.year}</div>
              </li>
            </Link>
          );
        })}
      </ul>
      {hoverImage ? <ImagePreview /> : <></>}
    </div>
  );
}

import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/ProjectInfo.module.css";

export default function ProjectInfo({ project }) {
  return (
    <section className={`${styles.projectInfo}`}>
      <h1>{project.name}</h1>
      <div className={`${styles["project-specifics"]}`}>
        <div className={`${styles["categories-wrapper"]}`}>
          <ul className={`${styles.categories}`}>
            {project.filtering.map((filter, index) => (
              <li className={`${styles.category}`} key={index}>
                {console.log(filter, "filter")}
                {filter.title},&nbsp;
              </li>
            ))}
          </ul>
          <div>{project.year}</div>
        </div>

        <p className={`${styles.description}`}>
          Project description will go here. It is not connected to the backend yet, so this is a demo stand in text. The
          description could talk about the creative process, the client, color choices, or reach.
        </p>
      </div>
    </section>
  );
}

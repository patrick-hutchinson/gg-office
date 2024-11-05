import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  const creditsMapping = [
    { key: "clients", title: "Client" },
    { key: "directors", title: "Direction" },
    { key: "creativedirectors", title: "Creative Director" },
    { key: "clientdirectors", title: "Client Director" },
    { key: "designers", title: "Designer" },
    { key: "artists3D", title: "3D Artist" },
    { key: "photographers", title: "Photography" },
  ];

  console.log(project.credits, "c");

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>

      <div className={styles["credits-wrapper"]}>
        <ul className={styles["credits-inhouse"]}>
          {project.creditsInhouse &&
            creditsMapping.map(
              ({ key, title }) =>
                project.creditsInhouse[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title}: <br />
                    {project.creditsInhouse[key].join(", ")}
                    <br />
                    <br />
                  </li>
                )
            )}
        </ul>
        <ul className={styles["credits-client"]}>
          {project.creditsClient &&
            creditsMapping.map(
              ({ key, title }) =>
                project.creditsClient[key] && (
                  <li className={`${styles.credit}`} key={key}>
                    {title}: <br />
                    {project.creditsClient[key].join(", ")}
                    <br />
                    <br />
                  </li>
                )
            )}
        </ul>
      </div>
    </section>
  );
}

import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  const creditsMapping = [
    { key: "directors", title: "Direction" },
    { key: "creativedirectors", title: "Creative Director" },
    { key: "clientdirectors", title: "Client Director" },
    { key: "designers", title: "Designer" },
    { key: "artists3D", title: "3D Artist" },
    { key: "photographers", title: "Photography" },
    { key: "clients", title: "Client" },
  ];

  console.log(project.credits, "c");

  return (
    <section className={styles["credits-wrapper"]}>
      <h2>Credits</h2>
      <ul className={styles.credits}>
        {project.credits &&
          creditsMapping.map(
            ({ key, title }) =>
              project.credits[key] && (
                <li className={`${styles.credit}`} key={key}>
                  {title}: <br />
                  {project.credits[key].join(", ")}
                  <br />
                  <br />
                </li>
              )
          )}
      </ul>
    </section>
  );
}

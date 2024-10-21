import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Credits.module.css";

export default function Credits({ project }) {
  return (
    <div className={styles["credits-wrapper"]}>
      <h1>Credits</h1>
      <div className={styles.credits}>
        {project.credits &&
          Object.entries(project.credits).map(([key, value], index) => (
            <div key={index}>
              <div>{key}</div>
              <div>{value.join(", ")}</div> {/* Assuming `value` is an array */}
            </div>
          ))}
      </div>
    </div>
  );
}

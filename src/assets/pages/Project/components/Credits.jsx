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
          project.credits.map((credit, index) =>
            credit ? (
              <div key={index}>
                <div>{credit.key}</div>
                <div>{credit.value}</div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/MoreProjects.module.css";

export default function MoreProjects({ data }) {
  let ProjectList = (
    <div className={styles["moreprojects-wrapper"]}>
      {data.map((project) => {
        return (
          <Link to={`/work/${project.name}`}>
            <img src="/assets/images/placeholder.jpg" />
          </Link>
        );
      })}
    </div>
  );
  return (
    <div>
      <h1>More Projects</h1>
      {ProjectList}
    </div>
  );
}

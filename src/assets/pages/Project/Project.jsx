import React from "react";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles/Project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import Gallery from "./components/Gallery";
import Credits from "./components/Credits";
import MoreProjects from "./components/MoreProjects";

export default function Project({ data }) {
  const { id } = useParams();

  // Early return if data is undefined or empty
  if (!data || data.length === 0) {
    return <p>Loading...</p>; // Or some other loading state or message
  }

  const project = data.find((project) => project.name === id);

  return (
    <main>
      <img
        className={`${styles.coverImage}`}
        src={project.image || "/assets/images/placeholder.jpg"}
        alt={project.name}
      />
      <ProjectInfo project={project} />
      <Gallery project={project} />
      <Credits project={project} />
      <MoreProjects data={data} />
    </main>
  );
}

import React from "react";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import sanityClient from "/src/client.js";

import { getFileSource } from "../../utils/getFileSource";
import { renderFile } from "../../utils/renderFile";

import styles from "./styles/Project.module.css";

import ProjectInfo from "./components/ProjectInfo";
import ImageGallery from "./components/ImageGallery";
import Credits from "./components/Credits";
import MoreProjects from "./components/MoreProjects";

export default function Project() {
  let [work, setWork] = useState();
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="project"]{
    name,
      coverimage,
      year,
      description,
      imagegallery,
      categories,
      credits,
      slug,
      gridStructure
  }`
      )
      .then((data) => setWork(data))
      .catch(console.error);
  }, []);

  const { slug } = useParams();

  // Early return if data is undefined or empty
  if (!work || work.length === 0) {
    return <p>Loading...</p>; // Or some other loading state or message
  }

  const project = work.find((project) => project.slug.current === slug);

  let Media = ({ project }) => {
    const fileInfo = getFileSource(project.coverimage);
    return renderFile(fileInfo);
  };

  return (
    <main>
      <Media project={project} className={`${styles.coverImage}`} alt={project.name} />
      <ProjectInfo project={project} />
      <ImageGallery project={project} />
      <Credits project={project} />
      <MoreProjects work={work} />
    </main>
  );
}

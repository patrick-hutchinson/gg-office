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
      filtering[]->{title},
      creditsInhouse,
      creditsClient,
      slug,
      gridStructure,
      thumbnail
  }`
      )
      .then((data) => setWork(data))
      .catch(console.error);
  }, []);

  const { slug } = useParams();

  if (!work) return <p>Loading...</p>; // Early return if data is undefined or empty

  const project = work.find((project) => project.slug.current === slug);

  let Media = ({ project }) => {
    const fileInfo = getFileSource(project.coverimage);
    return renderFile(fileInfo);
  };

  return (
    <main>
      <section>
        <Media project={project} className={`${styles.coverImage}`} alt={project.name} />
      </section>

      <ProjectInfo project={project} />

      {project.imagegallery && <ImageGallery project={project} />}

      {project.creditsInhouse && project.creditsClient && <Credits project={project} />}

      <MoreProjects work={work} />
    </main>
  );
}

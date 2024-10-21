import React from "react";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

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
      slug
  }`
      )
      .then((data) => setWork(data))
      .catch(console.error);
  }, []);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  const { slug } = useParams();

  // Early return if data is undefined or empty
  if (!work || work.length === 0) {
    return <p>Loading...</p>; // Or some other loading state or message
  }

  const project = work.find((project) => project.slug.current === slug);

  console.log(project, "project");

  return (
    <main>
      <img className={`${styles.coverImage}`} src={`${urlFor(project.coverimage)}`} alt={project.name} />
      <ProjectInfo project={project} />
      <ImageGallery project={project} />
      <Credits project={project} />
      <MoreProjects work={work} />
    </main>
  );
}

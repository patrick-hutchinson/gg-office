"use client";

import RenderMedia from "../../../assets/utils/RenderMedia";

import styles from "./styles/Project.module.css";
import { useContext } from "react";

import { GlobalDataContext } from "../../../assets/context/GlobalDataContext";

import ProjectInfo from "./components/ProjectInfo";
import ImageGallery from "./components/ImageGallery";
import Credits from "./components/Credits";
import MoreProjects from "./components/MoreProjects";

export default function Project({ slug }) {
  const { work } = useContext(GlobalDataContext);

  if (!work) return <p>Loading...</p>;

  const project = work.find((project) => project.slug.current === slug);
  if (!project) return <p>Project not found.</p>;

  return (
    <main>
      <div className={styles["project-container"]}>
        <RenderMedia medium={project.coverimage} />
        <ProjectInfo project={project} />
        {project.imagegallery && <ImageGallery project={project} />}
        {project.creditsInhouse && project.creditsClient && <Credits project={project} />}
        <MoreProjects work={work} />
      </div>
    </main>
  );
}

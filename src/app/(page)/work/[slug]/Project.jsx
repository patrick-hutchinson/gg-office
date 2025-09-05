"use client";

import RenderMedia from "@/components/RenderMedia/RenderMedia";
import Loading from "@/components/Loading/Loading";

import styles from "./styles/Project.module.css";
import { useContext } from "react";

import { DataContext } from "@/context/DataContext";

import ProjectInfo from "./components/ProjectInfo";
import ImageGallery from "./components/ImageGallery";
import Credits from "./components/Credits";
import MoreProjects from "./components/MoreProjects";

export default function Project({ slug }) {
  const { work } = useContext(DataContext);

  if (!work) return <Loading />;

  const project = work.find((project) => project.slug.current === slug);
  if (!project) return <p>Project not found.</p>;

  return (
    <main className={styles["project-container"]}>
      <RenderMedia medium={project.coverimage} enableFullscreen={true} />
      <ProjectInfo project={project} />
      {project.imagegallery && <ImageGallery project={project} />}
      {(project.creditsInhouse || project.creditsClient) && <Credits project={project} />}
      <MoreProjects work={work} currentProject={project} />
    </main>
  );
}

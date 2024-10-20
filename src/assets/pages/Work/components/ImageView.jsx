import React from "react";

import { useEffect, useState, useRef } from "react";

import "./styles/ImageView.css";

export default function ImageView({ data, selectedFilters }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.category.some((category) => selectedFilters.includes(category));

  if (!data) return null; // Early return if there's no data

  return (
    <div className="project-wrapper imageview">
      {data.map((project, index) => {
        if (!projectMatchesFilter(project)) return null; // Early return if project should not render

        return (
          <a href="#" className="project" key={index}>
            <img src="/assets/images/placeholder.jpg"></img>
          </a>
        );
      })}
    </div>
  );
}

import React from "react";

import { useEffect, useState, useRef } from "react";

import "./styles/ListView.css";

export default function ListView({ data, selectedFilters }) {
  // Helper function to determine if a project should be rendered
  const projectMatchesFilter = (project) => project.category.some((category) => selectedFilters.includes(category));

  if (!data) return null; // Early return if there's no data

  return (
    <div className="project-wrapper">
      <ul className="listview">
        {data.map((project, index) => {
          if (!projectMatchesFilter(project)) return null; // Early return if project should not render

          return (
            <li className="project" key={index}>
              <div>{project.name}</div>
              <div>{project.year}</div>
              <ul className="categories">
                {project.category.map((category, categoryIndex) => (
                  <li className="category" key={categoryIndex}>
                    {category}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="imagepreview">
        <img src="/assets/images/placeholder.jpg"></img>
      </div>
    </div>
  );
}

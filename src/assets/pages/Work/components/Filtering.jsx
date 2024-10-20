import React, { useEffect, useState } from "react";
import "./styles/Filtering.css";

export default function Filtering({ setSelectedFilters, filterArray }) {
  let [showFiltering, SetShowFiltering] = useState(false);
  let [allSelected, setAllSelected] = useState(true); // Track if "All" is selected

  // Toggle the filtering display
  function toggleShowFiltering(e) {
    e.preventDefault();
    SetShowFiltering(!showFiltering);
  }

  // Handle clicking "All"
  function handleAllFilter(e) {
    setSelectedFilters(filterArray); // Activate all filters
    setAllSelected(true); // Mark "All" as selected
  }

  // Handle individual filter clicks
  function handleFiltering(e, filter) {
    setSelectedFilters((prevSelectedFilters) => {
      // If "All" is currently selected, clear it and start fresh with the clicked filter
      if (allSelected) {
        setAllSelected(false);
        return [filter]; // Return only the clicked filter
      }

      // If the clicked filter is already active, remove it
      if (prevSelectedFilters.includes(filter)) {
        const updatedFilters = prevSelectedFilters.filter((f) => f !== filter);

        // Use ternary for the conditional return
        return updatedFilters.length === 0
          ? (setAllSelected(true), filterArray) // If no filters left, set "All" and return all filters
          : updatedFilters; // Otherwise, return the updated filters
      }

      // Otherwise, add the new filter
      return [...prevSelectedFilters, filter];
    });
  }

  return (
    <>
      <button onClick={toggleShowFiltering}>More Options</button>
      {showFiltering && (
        <ul className="filtering">
          <li onClick={(e) => handleAllFilter(e)}>All</li>
          {filterArray.map((filter, index) => (
            <li className="filter" key={index} onClick={(e) => handleFiltering(e, filter)}>
              {filter}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

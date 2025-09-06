import { useState, useEffect } from "react";
import styles from "./Filtering.module.css";

export default function Filtering({ filterArray, selectedFilters, setSelectedFilters }) {
  // "All" is selected if either everything is selected or none are
  const allSelected = selectedFilters.length === 0 || selectedFilters.length === filterArray.length;

  function handleAllFilter() {
    setSelectedFilters(filterArray); // Activate all filters
  }

  function handleFiltering(e, filter) {
    setSelectedFilters((prevSelectedFilters) => {
      if (allSelected) {
        return [filter]; // Start fresh with the clicked filter
      }

      if (prevSelectedFilters.includes(filter)) {
        const updatedFilters = prevSelectedFilters.filter((f) => f !== filter);
        return updatedFilters.length === 0 ? filterArray : updatedFilters;
      }

      return [...prevSelectedFilters, filter];
    });
  }

  return (
    <div className={styles["filtering-wrapper"]}>
      <ul className={styles.filtering}>
        <li className={`${styles.filter} button ${allSelected ? "active" : ""}`} onClick={handleAllFilter}>
          All
        </li>
        {filterArray
          .slice()
          .sort((a, b) => a.localeCompare(b))
          .map((filter, index) => (
            <li
              className={`${styles.filter} button ${selectedFilters.includes(filter) && !allSelected ? "active" : ""}`}
              key={index}
              onClick={(e) => handleFiltering(e, filter)}
            >
              {filter}
            </li>
          ))}
      </ul>
    </div>
  );
}

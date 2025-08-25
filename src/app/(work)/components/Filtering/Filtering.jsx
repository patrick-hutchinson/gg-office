import { useState, useEffect } from "react";
import styles from "./Filtering.module.css";

export default function Filtering({ filterArray, selectedFilters, setSelectedFilters }) {
  let [allSelected, setAllSelected] = useState(true); // Track if "All" is selected

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setAllSelected(true);
    } else if (selectedFilters.length === filterArray.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedFilters, filterArray.length]);

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
        return updatedFilters.length === 0 ? filterArray : updatedFilters;
      }

      // Otherwise, add the new filter
      return [...prevSelectedFilters, filter];
    });
  }

  return (
    <div className={styles["filtering-wrapper"]}>
      <ul className={`${styles.filtering}`}>
        <li className={`${styles.filter} button ${allSelected ? "active" : ""}`} onClick={(e) => handleAllFilter(e)}>
          All
        </li>
        {filterArray
          .slice() // Creates a shallow copy to avoid mutating the original array
          .sort((a, b) => a.localeCompare(b)) // Sorts the array alphabetically
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

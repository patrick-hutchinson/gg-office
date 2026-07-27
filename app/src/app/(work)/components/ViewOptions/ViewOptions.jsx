import { useState, useEffect } from "react";

import styles from "../../work.module.css";

import Filtering from "../Filtering/Filtering";

export default function ViewOptions({ activeView, setActiveView, filters, selectedFilters, setSelectedFilters }) {
  let views = ["Image View", "List View"];
  let [showFiltering, setShowFiltering] = useState(false);

  let Views = () => {
    return (
      <ul className={`${styles.viewwrapper}`}>
        {views.map((view, index) => {
          return (
            <li
              className={`button ${activeView === view ? "active" : ""}`}
              onClick={(e) => handleView(e.currentTarget)}
              key={index}
            >
              {view}
            </li>
          );
        })}
      </ul>
    );
  };

  function handleView(target) {
    setActiveView(target.textContent);

    // target.classList.add("active");
  }

  return (
    <>
      <div className={`${styles["options-wrapper"]}`}>
        <Views />

        <button className={`${styles.toggleOptions} button`} onClick={() => setShowFiltering(!showFiltering)}>
          {showFiltering ? "Hide Filters" : "Filters"}
        </button>
      </div>

      {showFiltering && (
        <Filtering filterArray={filters} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      )}
    </>
  );
}

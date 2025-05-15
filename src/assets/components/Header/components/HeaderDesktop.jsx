import React from "react";

import styles from "./styles/HeaderDesktop.module.css";
import { Link } from "react-router-dom";

export default function HeaderDesktop({ location, setShowOpening }) {
  let [isDarkMode, setIsDarkMode] = React.useState(true);

  function handleThemeSwitch() {
    var root = document.querySelector(":root");
    if (isDarkMode) {
      root.style.setProperty("--text-color", "#000000");
      root.style.setProperty("--background-color", "#eaeaea");
      setIsDarkMode(false);
    } else {
      root.style.setProperty("--text-color", "#eaeaea");
      root.style.setProperty("--background-color", "#000000");
      setIsDarkMode(true);
    }
  }
  return (
    <div className={`${styles.headerDesktop}`}>
      <nav>
        <ul className={`${styles.navigation}`}>
          <li className={`button`} onClick={() => setShowOpening(true)}>
            <Link to="/">GG–OFFICE</Link>
          </li>
          <li className={`button ${location === "/" ? "active" : ""}`} onClick={() => setShowOpening(false)}>
            <Link to="/">Work</Link>
          </li>
          <li className={`button ${location.includes("about") ? "active" : ""}`}>
            <Link to="/about">About</Link>
          </li>
          <li className={`button ${location.includes("research") ? "active" : ""}`}>
            <Link to="/research">Research</Link>
          </li>
          <li className={`button ${location.includes("contact") ? "active" : ""}`}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="switchTheme" onClick={handleThemeSwitch}>
        SWITCH
      </div>
      <p>Independent graphic and motion agency based in Sicily</p>
    </div>
  );
}

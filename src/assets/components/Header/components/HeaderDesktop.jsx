import { useState, useContext } from "react";

import styles from "./styles/HeaderDesktop.module.css";
import Link from "next/link";

import { AnimationContext } from "/src/assets/context/AnimationContext";

export default function HeaderDesktop({ location, setShowOpening }) {
  const { isDarkMode, setIsDarkMode } = useContext(AnimationContext);

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
            <Link href="/">GG—OFFICE</Link>
          </li>
          <li className={`button ${location === "/" ? "active" : ""}`} onClick={() => setShowOpening(false)}>
            <Link href="/">Work</Link>
          </li>
          <li className={`button ${location.includes("about") ? "active" : ""}`}>
            <Link href="/about">About</Link>
          </li>
          <li className={`button ${location.includes("research") ? "active" : ""}`}>
            <Link href="/research">Research</Link>
          </li>
          <li className={`button`}>
            <Link href="https://www.gg-rugs.com" target="_blank">
              RUGS
            </Link>
          </li>
          <li className={`button ${location.includes("contact") ? "active" : ""}`}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={styles["switchTheme"]} onClick={handleThemeSwitch}>
        Switch
      </div>
      <p className={styles["tagline"]}>Independent graphic and motion agency based in Sicily</p>
    </div>
  );
}

import { useState, useContext } from "react";

import styles from "./styles/HeaderDesktop.module.css";
import Link from "next/link";

import { AnimationContext } from "@/context/AnimationContext";

import { StateContext } from "@/context/StateContext";

export default function HeaderDesktop({ location }) {
  const { isDarkMode, setIsDarkMode } = useContext(AnimationContext);

  const { showOpening, setShowOpening } = useContext(StateContext);

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
      <ul className={`${styles.navigation}`}>
        <li
          className={`button ${location === "/" && showOpening ? "active" : ""}`}
          onClick={() => setShowOpening(true)}
        >
          <Link href="/">GG—OFFICE</Link>
        </li>
        <li
          className={`button ${location === "/" && !showOpening ? "active" : ""}`}
          onClick={() => setShowOpening(false)}
        >
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
            Rugs
          </Link>
        </li>
        <li className={`button ${location.includes("contact") ? "active" : ""}`}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <span className={`${styles["switchTheme"]} button`} onClick={handleThemeSwitch}>
        Switch
      </span>

      <p className={styles["tagline"]}>Independent graphic and motion agency based in Sicily</p>
    </div>
  );
}

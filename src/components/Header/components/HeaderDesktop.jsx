import { useState, useContext, useEffect } from "react";

import styles from "./styles/HeaderDesktop.module.css";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimationContext } from "@/context/AnimationContext";

import { StateContext } from "@/context/StateContext";

export default function HeaderDesktop({ location, showOpening, setShowOpening }) {
  const { theme, setTheme } = useTheme();

  // const { showOpening, setShowOpening } = useContext(StateContext);

  function handleThemeSwitch() {
    setTheme(theme === "light" ? "dark" : "light");
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
        <li className={`button external-button`}>
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

import { usePathname } from "next/navigation";
import { useContext } from "react";

import { AnimationContext } from "@/context/AnimationContext";

import styles from "./styles/HeaderMobile.module.css";
import Link from "next/link";

const MobileMenu = ({ location, setShowMenu }) => {
  function handleMenuClick() {
    setShowMenu(false);
  }

  const pathname = usePathname();

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
    <div className={`${styles.expandMenu}`}>
      <li className={`${styles.button} button ${pathname === "/" ? "active" : ""}`} onClick={handleMenuClick}>
        <Link href="/">Work</Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("about") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/about">About</Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("research") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/research">Research</Link>
      </li>
      <li className={`${styles.button} button`}>
        <Link href="https://www.gg-rugs.com" target="_blank">
          RUGS
        </Link>
      </li>
      <li
        className={`${styles.button} button ${location.includes("contact") ? "active" : ""}`}
        onClick={() => {
          handleMenuClick();
        }}
      >
        <Link href="/contact">Contact</Link>
      </li>

      <br />
      <br />
      <div className={styles["switchTheme"]} onClick={handleThemeSwitch}>
        Switch
      </div>
    </div>
  );
};

export default MobileMenu;

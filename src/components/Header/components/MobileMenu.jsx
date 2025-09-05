import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import styles from "./styles/HeaderMobile.module.css";
import Link from "next/link";

const MobileMenu = ({ location, setShowMenu }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMenuClick() {
    setShowMenu(false);
  }

  function handleThemeSwitch() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  if (!mounted) return;

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
          Rugs
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

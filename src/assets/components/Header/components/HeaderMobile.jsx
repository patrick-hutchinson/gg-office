import styles from "./styles/HeaderMobile.module.css";
import Link from "next/link";

import { useState } from "react";

export default function HeaderMobile({ location }) {
  let [showMenu, setShowMenu] = useState(false);

  function expandMenu() {
    setShowMenu(!showMenu);
  }

  function handleMenuClick() {
    setShowMenu(false);
  }

  return (
    <ul className={`${styles.headerMobile}`}>
      <li className={`${styles.button} button ${location.includes("gg–office") ? "active" : ""}`}>
        <Link href="/">GG–OFFICE</Link>
      </li>

      <li className={`${styles.button} button`} onClick={expandMenu}>
        menu
      </li>

      {showMenu && (
        <div className={`${styles.expandMenu}`}>
          <li
            className={`${styles.button} button active`}
            onClick={() => {
              handleMenuClick();
            }}
          >
            <Link href="/">Work</Link>
          </li>
          <li
            className={`${styles.button} button active`}
            onClick={() => {
              handleMenuClick();
            }}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`${styles.button} button active`}
            onClick={() => {
              handleMenuClick();
            }}
          >
            <Link href="/research">Research</Link>
          </li>
          <li
            className={`${styles.button} button active`}
            onClick={() => {
              handleMenuClick();
            }}
          >
            <Link href="/contact">About</Link>
          </li>
        </div>
      )}
    </ul>
  );
}

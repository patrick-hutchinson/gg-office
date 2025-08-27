import styles from "./styles/HeaderMobile.module.css";
import Link from "next/link";

import MobileMenu from "./MobileMenu";

import { useState } from "react";

export default function HeaderMobile({ location, setShowOpening }) {
  let [showMenu, setShowMenu] = useState(false);

  function expandMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <ul className={`${styles.headerMobile}`}>
      <li
        className={`${styles.button} button ${location.includes("gg–office") ? "active" : ""}`}
        onClick={() => setShowOpening(true)}
      >
        <Link href="/">GG—OFFICE</Link>
      </li>

      <li className={`${styles.button} button ${showMenu ? "active" : ""}`} onClick={expandMenu}>
        MENU
      </li>

      {showMenu && <MobileMenu location={location} setShowMenu={setShowMenu} />}
    </ul>
  );
}

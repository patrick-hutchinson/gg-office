import React from "react";

import { useEffect, useState, useRef } from "react";

import styles from "./styles/HeaderMobile.module.css";
import { Link } from "react-router-dom";

export default function HeaderMobile({ location }) {
  let [showMenu, setShowMenu] = React.useState(false);

  function expandMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <ul className={`${styles.headerMobile}`}>
      <li className={`${styles.button} button ${location.includes("gg–office") ? "active" : ""}`}>
        <Link to="/">GG–OFFICE</Link>
      </li>

      <li className={`${styles.button} button`} onClick={expandMenu}>
        menu
      </li>

      {showMenu && (
        <div className={`${styles.expandMenu}`}>
          <li className={`${styles.button} button active`}>
            <Link to="/">Work</Link>
          </li>
          <li className={`${styles.button} button active`}>
            <Link to="/about">About</Link>
          </li>
          <li className={`${styles.button} button active`}>
            <Link to="/research">Research</Link>
          </li>
          <li className={`${styles.button} button active`}>
            <Link to="/contact">Contact</Link>
          </li>
        </div>
      )}
    </ul>
  );
}

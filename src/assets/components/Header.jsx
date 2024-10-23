import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Header.module.css";

export default function Header({ location }) {
  useEffect(() => {
    console.log(location, "location");
  }, [location]);

  return (
    <header>
      <nav>
        <ul className={`${styles.navigation}`}>
          <li className={`${styles.button} button ${location.includes("gg–office") ? "active" : ""}`}>
            <Link to="/">GG–OFFICE</Link>
          </li>

          <li className={`${styles.button} button ${location.includes("work") ? "active" : ""}`}>
            <Link to="/work">Work</Link>
          </li>
          <li className={`${styles.button} button ${location.includes("about") ? "active" : ""}`}>
            <Link to="/about">About</Link>
          </li>
          <li className={`${styles.button} button ${location.includes("research") ? "active" : ""}`}>
            <Link to="/research">Research</Link>
          </li>
          <li className={`${styles.button} button ${location.includes("contact") ? "active" : ""}`}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <p>Independent graphic and motion agency based in Sicily</p>
    </header>
  );
}

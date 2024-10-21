import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className={`${styles.navigation}`}>
          <Link to="/">
            <li>GG–OFFICE</li>
          </Link>

          <Link to="/work">
            <li>Work</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/research">
            <li>Research</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </nav>
      <p>Independent graphic and motion agency based in Sicily</p>
    </header>
  );
}

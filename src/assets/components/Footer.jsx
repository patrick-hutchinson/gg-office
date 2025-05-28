import React from "react";

import { useEffect, useState, useRef } from "react";

import styles from "./styles/Footer.module.css";

export default function Footer() {
  let currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Our OFFICE is located at Corso Umberto I, N° 5, 97015 Modica (Rg) Sicily</p>
      <p className={`${styles.copyright}`}>{`(GG) 2021—${currentYear} All Rights Reserved. `}</p>
    </footer>
  );
}

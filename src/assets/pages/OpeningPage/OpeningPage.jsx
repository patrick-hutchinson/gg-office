import React from "react";

import { useEffect, useState, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/OpeningPage.module.css";

const OpeningPage = forwardRef((props, openingpageRef) => {
  let columnRef = useRef(null);

  useEffect(() => {
    openingpageRef.current.querySelectorAll(`.${styles["GGOFFICE-column"]}`).forEach((column, index, array) => {
      column.addEventListener("mouseenter", (e) => {
        const rect = openingpageRef.current.getBoundingClientRect();
        const rectHeight = openingpageRef.current.offsetHeight;
        const mouseYInElement = e.clientY - rect.top;

        let leftValue = mouseYInElement / rectHeight;
        let rightValue = 1 - leftValue;

        column.style["grid-template-rows"] = `${leftValue * 100}% ${rightValue * 100}%`;
      });
    });
  }, []);

  return (
    <section>
      <div className={`${styles["GGOFFICE-wrapper"]}`} ref={openingpageRef}>
        <div className={`${styles["GGOFFICE-column"]}`} ref={columnRef}>
          <img src="/assets/images/GOODGAME/G.png" alt="" />
          <img src="/assets/images/GOODGAME/G.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/O.png" alt="" />
          <img src="/assets/images/GOODGAME/O.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/O.png" alt="" />
          <img src="/assets/images/GOODGAME/O.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/D.png" alt="" />
          <img src="/assets/images/GOODGAME/D.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          {" "}
          <img src="/assets/images/GOODGAME/G.png" alt="" />
          <img src="/assets/images/GOODGAME/G.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/A.png" alt="" />
          <img src="/assets/images/GOODGAME/A.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/M.png" alt="" />
          <img src="/assets/images/GOODGAME/M.png" alt="" />
        </div>
        <div className={`${styles["GGOFFICE-column"]}`}>
          <img src="/assets/images/GOODGAME/E.png" alt="" />
          <img src="/assets/images/GOODGAME/E.png" alt="" />
        </div>
      </div>
    </section>
  );
});

export default OpeningPage;

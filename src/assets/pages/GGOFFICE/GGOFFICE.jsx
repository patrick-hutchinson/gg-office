import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/GGOFFICE.module.css";

export default function GGOFFICE({ setShowOpeningPage }) {
  let GGOFFICERef = useRef(null);
  let columnRef = useRef(null);

  window.addEventListener("click", () => {
    handleOpeningPageClose();
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleOpeningPageClose = () => {
    window.scrollTo({
      top: GGOFFICERef.current.offsetHeight + 30,
      behavior: "smooth",
    });

    setTimeout(() => {
      localStorage.setItem("hasSeenOpeningPage", "true");
      setShowOpeningPage(false);
    }, 1000);
  };

  useEffect(() => {
    GGOFFICERef.current.querySelectorAll(`.${styles["GGOFFICE-column"]}`).forEach((column, index, array) => {
      column.addEventListener("mouseenter", (e) => {
        const rect = GGOFFICERef.current.getBoundingClientRect();
        const rectHeight = GGOFFICERef.current.offsetHeight;
        const mouseYInElement = e.clientY - rect.top;

        let leftValue = mouseYInElement / rectHeight;
        let rightValue = 1 - leftValue;

        column.style["grid-template-rows"] = `${leftValue * 100}% ${rightValue * 100}%`;
      });
    });
  }, []);
  return (
    <section>
      <div className={`${styles["GGOFFICE-wrapper"]}`} ref={GGOFFICERef}>
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
}

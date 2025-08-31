"use client";

import { useState, useEffect, useRef, useContext, useMemo, useLayoutEffect } from "react";

import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";

import styles from "./styles/Research.module.css";

import Loading from "@/components/Loading/Loading";

import Column from "./components/Column";
import { motion } from "framer-motion";

export default function Gallery() {
  const { isMobile } = useContext(StateContext);
  const { research } = useContext(DataContext);
  const scrollDummy = useRef();

  const lastScrollY = useRef(0);
  const [mobileScroll, setMobileScroll] = useState(0);

  useLayoutEffect(() => {
    if (!scrollDummy.current) return;

    console.log("this should set it");
    const el = scrollDummy.current;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    el.scrollTop = scrollHeight / 2;
    lastScrollY.current = el.scrollTop;
  }, []);

  const handleScroll = (e) => {
    setMobileScroll(e.target.scrollTop - lastScrollY.current);

    lastScrollY.current = e.target.scrollTop;
  };

  if (!research) return <Loading />;

  // Variable declaration
  const columnCount = isMobile ? 2 : 3;

  return (
    <main className={`research ${styles["research"]}`}>
      {isMobile && (
        <motion.div
          className={styles["scroll-dummy"]}
          style={{ position: "fixed", height: "100vh", width: "100vw", overflowY: "scroll", top: 0, left: 0 }}
          ref={scrollDummy}
          onScroll={(e) => {
            handleScroll(e);
          }}
        >
          <div className={styles["scroll-dummy-inner"]} style={{ position: "relative", height: 10000 }}></div>
        </motion.div>
      )}

      <div className={styles["container"]} style={{ pointerEvents: isMobile ? "hidden" : "all" }}>
        <div className={styles["container-inner"]}>
          {Array.from({ length: columnCount }, (column, index) => (
            <Column key={index} columnNumber={index} columnCount={columnCount} mobileScroll={mobileScroll} />
          ))}
        </div>
      </div>
    </main>
  );
}

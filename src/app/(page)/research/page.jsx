"use client";

import { useRef, useContext, useLayoutEffect } from "react";
import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";
import styles from "./styles/Research.module.css";
import Loading from "@/components/Loading/Loading";
import Column from "./components/Column";
import { motion, useMotionValue } from "framer-motion";

export default function Gallery() {
  const { isMobile } = useContext(StateContext);
  const { research } = useContext(DataContext);

  const scrollDummy = useRef();
  const lastScrollY = useRef(0);
  const mobileDeltaY = useMotionValue(0); // motion value instead of state

  useLayoutEffect(() => {
    if (!scrollDummy.current) return;
    const el = scrollDummy.current;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    el.scrollTop = scrollHeight / 2;
    lastScrollY.current = el.scrollTop;
  }, []);

  const handleScroll = (e) => {
    const delta = e.target.scrollTop - lastScrollY.current;
    mobileDeltaY.set(delta); // update motion value directly
    lastScrollY.current = e.target.scrollTop;
  };

  if (!research) return <Loading />;

  const columnCount = isMobile ? 2 : 3;

  return (
    <main className={`research ${styles["research"]}`}>
      {isMobile && (
        <motion.div
          className={styles["scroll-dummy"]}
          style={{ position: "fixed", height: "100vh", width: "100vw", overflowY: "scroll", top: 0, left: 0 }}
          ref={scrollDummy}
          onScroll={handleScroll}
        >
          <div className={styles["scroll-dummy-inner"]} style={{ position: "relative", height: 10000 }} />
        </motion.div>
      )}

      <div className={styles["container"]} style={{ pointerEvents: isMobile ? "hidden" : "all" }}>
        <div className={styles["container-inner"]}>
          {Array.from({ length: columnCount }, (_, index) => (
            <Column key={index} columnNumber={index} columnCount={columnCount} mobileDeltaY={mobileDeltaY} />
          ))}
        </div>
      </div>
    </main>
  );
}

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

  // const handleScroll = (e) => {
  //   const delta = e.target.scrollTop - lastScrollY.current;
  //   mobileDeltaY.set(delta); // update motion value directly
  //   lastScrollY.current = e.target.scrollTop;

  //   console.log(mobileDeltaY.current, "current");
  // };

  if (!research) return <Loading />;

  console.log(research, "research");

  const columnCount = isMobile ? 2 : 3;

  return (
    <main className={`research ${styles["research"]}`}>
      <div className={styles["container"]}>
        <div className={styles["container-inner"]}>
          {Array.from({ length: columnCount }, (_, index) => (
            <Column key={index} columnNumber={index} columnCount={columnCount} mobileDeltaY={mobileDeltaY} />
          ))}
        </div>
      </div>
    </main>
  );
}

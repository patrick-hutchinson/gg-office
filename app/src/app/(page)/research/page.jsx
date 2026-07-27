"use client";

import { useRef, useContext, useLayoutEffect } from "react";
import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";
import styles from "./styles/Research.module.css";
import Loading from "@/components/Loading/Loading";
import Column from "./components/Column";
import { motion, useMotionValue } from "framer-motion";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

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

  if (!research) return <Loading />;

  const columnCount = isMobile ? 2 : 3;
  const imagegallery = research?.[0]?.imagegallery;

  return (
    <main className={`research ${styles["research"]}`}>
      <div className={styles["container"]}>
        <div className={styles["container-inner"]}>
          {hasSanityValue(imagegallery) ? (
            Array.from({ length: columnCount }, (_, index) => (
              <Column key={index} columnNumber={index} columnCount={columnCount} mobileDeltaY={mobileDeltaY} />
            ))
          ) : (
            <SanityPreviewFallback fieldTitle="research image gallery" />
          )}
        </div>
      </div>
    </main>
  );
}

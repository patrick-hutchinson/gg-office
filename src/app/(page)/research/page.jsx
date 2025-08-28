"use client";

import { useState, useEffect, useRef, useContext, useMemo } from "react";

import { DataContext } from "@/context/DataContext";
import { StateContext } from "@/context/StateContext";

import styles from "./styles/Research.module.css";

import Loading from "@/components/Loading/Loading";

import Column from "./components/Column";

export default function Gallery() {
  const { isMobile } = useContext(StateContext);
  const { research } = useContext(DataContext);

  if (!research) return <Loading />;

  // Variable declaration
  const columnCount = isMobile ? 2 : 3;

  return (
    <main className="research">
      <div className={styles["container"]}>
        <div className={styles["container-inner"]}>
          {Array.from({ length: columnCount }, (column, index) => (
            <Column key={index} columnNumber={index} columnCount={columnCount} />
          ))}
        </div>
      </div>
    </main>
  );
}

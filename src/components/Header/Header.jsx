"use client";

import { useContext } from "react";

import { GlobalStateContext } from "@/context/GlobalStateContext";

import { useEffect } from "react";

import styles from "./styles/Header.module.css";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export default function Header({ location, setShowOpening }) {
  const { isMobile } = useContext(GlobalStateContext);

  return (
    <header className={styles.header}>
      {isMobile ? (
        <HeaderMobile location={location} />
      ) : (
        <HeaderDesktop location={location} setShowOpening={setShowOpening} />
      )}
    </header>
  );
}

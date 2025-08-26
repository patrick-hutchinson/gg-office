"use client";

import { useContext } from "react";

import { StateContext } from "@/context/StateContext";

import { useEffect } from "react";

import styles from "./styles/Header.module.css";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export default function Header({ location, setShowOpening }) {
  const { isMobile } = useContext(StateContext);

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

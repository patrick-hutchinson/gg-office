"use client";

import React, { useContext } from "react";

import { GlobalStateContext } from "/src/assets/context/GlobalStateContext";

import { useEffect, useState, useRef } from "react";

import styles from "./styles/Header.module.css";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export default function Header({ location, setShowOpening }) {
  const { isMobile } = useContext(GlobalStateContext);

  useEffect(() => {}, [location]);

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

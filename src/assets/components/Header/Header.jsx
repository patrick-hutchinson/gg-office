import React, { useContext } from "react";

import { GlobalStateContext } from "/src/assets/context/GlobalStateContext";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Header.module.css";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export default function Header({ location }) {
  const { isMobile } = useContext(GlobalStateContext);

  useEffect(() => {}, [location]);

  return <header>{isMobile ? <HeaderMobile location={location} /> : <HeaderDesktop location={location} />}</header>;
}

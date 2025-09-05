"use client";

import { useContext } from "react";

import { StateContext } from "@/context/StateContext";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export default function Header({ location, showOpening, setShowOpening }) {
  const { isMobile } = useContext(StateContext);

  return (
    <header>
      {isMobile ? (
        <HeaderMobile location={location} />
      ) : (
        <HeaderDesktop location={location} showOpening={showOpening} setShowOpening={setShowOpening} />
      )}
    </header>
  );
}

"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

import { StateContext } from "@/context/StateContext";

// import Header from "@/components/Header/Header";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function PageLayout({ children }) {
  const pathname = usePathname();
  const { showOpening, setShowOpening } = useContext(StateContext);

  const isResearch = pathname === "/research";

  return (
    <div>
      <Header location={pathname} showOpening={showOpening} setShowOpening={setShowOpening} />
      <div id="root">{children}</div>
      {!isResearch && <Footer />}
    </div>
  );
}

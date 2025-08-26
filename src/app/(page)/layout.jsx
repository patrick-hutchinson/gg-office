"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";

import { StateContext } from "@/context/StateContext";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function PageLayout({ children }) {
  const pathname = usePathname();
  const { setShowOpening } = useContext(StateContext);

  return (
    <div>
      <Header location={pathname} setShowOpening={setShowOpening} />
      <div id="root">{children}</div>
      <Footer />
    </div>
  );
}

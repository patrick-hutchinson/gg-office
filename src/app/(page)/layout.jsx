"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { StateContext } from "@/context/StateContext";

// import Header from "@/components/Header/Header";
const Header = dynamic(() => import("@/components/Header/Header"), { ssr: false });
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

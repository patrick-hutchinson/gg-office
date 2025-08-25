"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function PageLayout({ children }) {
  const pathname = usePathname();

  return (
    <div>
      <Header location={pathname} />

      <div>{children}</div>

      <Footer />
    </div>
  );
}

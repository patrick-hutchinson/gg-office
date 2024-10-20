import React from "react";

import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import "./styles/Layout.css";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

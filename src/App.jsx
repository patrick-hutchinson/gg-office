import React from "react";

import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./assets/components/Layout";
import Work from "./assets/pages/Work/Work";
import Project from "./assets/pages/Project/Project";
import About from "./assets/pages/About/About";
import Research from "./assets/pages/Research/Research";
import Contact from "./assets/pages/Contact/Contact";

function App() {
  const [showOpeningPage, setShowOpeningPage] = React.useState(() => {
    const hasSeenOpeningPage = localStorage.getItem("hasSeenOpeningPage");
    return !hasSeenOpeningPage;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout showOpeningPage={showOpeningPage} setShowOpeningPage={setShowOpeningPage} />}>
          <Route index element={<Work />}></Route>
          <Route
            path="work"
            element={<Work setShowOpeningPage={setShowOpeningPage} showOpeningPage={showOpeningPage} />}
          ></Route>
          <Route path="work/:slug" element={<Project />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="research" element={<Research />}></Route>
          <Route path="contact" element={<Contact />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

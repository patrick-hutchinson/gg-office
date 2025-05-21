import React from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import { GlobalDataProvider } from "./assets/context/GlobalDataContext";

import Layout from "./assets/components/Layout";
import Work from "./assets/pages/Work/Work";
import Project from "./assets/pages/Project/Project";
import About from "./assets/pages/About/About";
import Research from "./assets/pages/Research/Research";
import Contact from "./assets/pages/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <GlobalDataProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Work />}></Route>
            <Route path="work/:slug" element={<Project />}></Route>
            <Route path="about" element={<About />}></Route>

            <Route path="research" element={<Research />}></Route>
            <Route path="contact" element={<Contact />}></Route>
          </Route>
        </Routes>
      </GlobalDataProvider>
    </BrowserRouter>
  );
}

export default App;

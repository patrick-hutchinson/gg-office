import React from "react";

import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./assets/components/Layout";
import Work from "./assets/pages/Work/Work";
import Project from "./assets/pages/Project/Project";
import About from "./assets/pages/About";
import Research from "./assets/pages/Research";
import Contact from "./assets/pages/Contact";

function App() {
  const [strapiBaseURL] = useState("https://railwayapp-strapi-production-1c18.up.railway.app");

  const [data, setData] = useState({
    projects: null,
    about: null,
    commissions: null,
    contact: null,
  });

  // Fetch and Initialize Data
  useEffect(() => {
    const endpoints = [
      {
        key: "projects",
        url: `${strapiBaseURL}/api/projects?populate=*`,
      },
    ];

    Promise.all(endpoints.map((endpoint) => fetch(endpoint.url).then((res) => res.json())))
      .then((results) => {
        const newData = {};
        results.forEach((result, index) => {
          const key = endpoints[index].key;
          newData[key] = result.data;
        });
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [strapiBaseURL]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index></Route>
          <Route path="work" element={<Work data={data.projects} />}></Route>
          <Route path="work/:id" element={<Project data={data.projects} />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="research" element={<Research />}></Route>
          <Route path="contact" element={<Contact />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

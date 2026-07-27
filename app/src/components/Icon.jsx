"use client";

import { useState, useEffect } from "react";

const Icon = ({ path, classname }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, [path]);

  return <div className="icon" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Icon;

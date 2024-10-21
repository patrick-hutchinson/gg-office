import React from "react";

import { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import imageUrlBuilder from "@sanity/image-url";

import styles from "./styles/Research.module.css";

export default function Research() {
  const [research, setResearch] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="research"]{
          imagegallery
        }`
      )
      .then((data) => setResearch(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(research, "research");
  }, [research]);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  // Early return if about data is undefined or empty
  if (!research || research.length === 0) {
    return <p>Loading...</p>;
  }

  let Images = () => {
    return (
      <div>
        {research[0].imagegallery.map((image) => {
          console.log(image, "image");
          return <img src={urlFor(image)} />;
        })}
      </div>
    );
  };

  return (
    <main>
      <Images />
    </main>
  );
}

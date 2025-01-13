import React from "react";

import { useEffect, useState, useRef } from "react";
import sanityClient from "/src/client.js";

import Rellax from "rellax";
import Loading from "../../components/Loading/Loading";

import { getFileSource } from "../../utils/getFileSource";
import { renderFile } from "../../utils/renderFile";

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

  // Early return if about data is undefined or empty
  if (!research) return <Loading />;

  let Media = ({ project }) => {
    const fileInfo = getFileSource(project);
    return renderFile(fileInfo);
  };

  let Images = () => {
    useEffect(() => {
      new Rellax(".rellax", {
        speed: -2, // Adjust speed as desired
        center: false, // Adjust options based on your need
      });
    }, []);

    return (
      <div className={`${styles["image-container"]}`}>
        {research[0].imagegallery.map((image, index) => {
          // Generate a random number between -10 and 10
          const randomSpeed = Math.floor(Math.random() * 11) - 5;

          return (
            <div data-rellax-speed={randomSpeed} key={index} className="rellax">
              <Media project={image} />
            </div>
          );
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

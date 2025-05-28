"use client";

import { useEffect, useContext } from "react";

import Rellax from "rellax";
import Loading from "../../assets/components/Loading/Loading";

import RenderMedia from "../../assets/utils/RenderMedia";

import styles from "./styles/Research.module.css";
import { GlobalDataContext } from "../../assets/context/GlobalDataContext";

export default function Research() {
  // Early return if about data is undefined or empty

  const { research } = useContext(GlobalDataContext);

  if (!research) return <Loading />;

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
              <RenderMedia medium={image} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <div className={styles["research-container"]}>
        <Images />
      </div>
    </main>
  );
}

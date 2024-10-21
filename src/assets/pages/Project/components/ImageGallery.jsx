import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

import styles from "./styles/ImageGallery.module.css";

export default function ImageGallery({ project }) {
  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  let Images = () => {
    return project.imagegallery.map((image) => {
      return <img src={urlFor(image)} alt="" />;
    });
  };

  let ErrorMessage = () => {
    return <div>No Images have been added to this project yet.</div>;
  };

  return <div className={styles.imagegallery}>{project.imagegallery ? <Images /> : <ErrorMessage />}</div>;
}

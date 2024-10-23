import React from "react";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import sanityClient from "/src/client.js";
import imageUrlBuilder from "@sanity/image-url";

import styles from "./styles/ImageGallery.module.css";

export default function ImageGallery({ project }) {
  console.log(project, "p");

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  let Images = () => {
    let index = 0; // Initialize the index for slicing images

    return (
      project.gridStructure &&
      project.gridStructure.map((columnsInRow, rowIndex) => {
        const rowImages = project.imagegallery.slice(index, index + columnsInRow); // Slice the images for each row
        index += columnsInRow; // Update the index for the next row

        const rowStyles = {
          gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`, // Use the value from gridStructure for this row
        };

        return (
          <div key={rowIndex} className={styles.galleryRow} style={rowStyles}>
            {rowImages.map((image, imgIndex) => (
              <img key={imgIndex} src={urlFor(image)} alt="" />
            ))}
          </div>
        );
      })
    );
  };

  let ErrorMessage = () => {
    return <div>No Images have been added to this project yet.</div>;
  };

  return <section className={styles.imagegallery}>{project.imagegallery ? <Images /> : <ErrorMessage />}</section>;
}

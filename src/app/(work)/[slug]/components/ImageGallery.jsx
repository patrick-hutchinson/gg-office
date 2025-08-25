import styles from "./styles/ImageGallery.module.css";

import RenderMedia from "../../../../assets/components/RenderMedia";

export default function ImageGallery({ project }) {
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
            {rowImages.map((image, imgIndex) => {
              return <RenderMedia medium={image} key={imgIndex} />;
            })}
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

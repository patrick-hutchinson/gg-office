import styles from "./styles/ImageGallery.module.css";

import { getFileSource } from "../../../utils/getFileSource";
import RenderFile from "../../../utils/renderFile";

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
              return <RenderFile source={getFileSource(image, { width: 800 })} key={imgIndex} />;
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

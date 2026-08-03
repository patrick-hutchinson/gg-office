import styles from "./styles/ImageGallery.module.css";

import Media from "@/components/Media/Media";
import SanityPreviewFallback, { hasSanityValue } from "@/components/SanityPreviewFallback";

export default function ImageGallery({ project }) {
  let Images = () => {
    let index = 0; // Initialize the index for slicing images
    const gridStructure = hasSanityValue(project.gridStructure) ? project.gridStructure : [project.imagegallery.length];

    return (
      gridStructure.map((columnsInRow, rowIndex) => {
        const rowImages = project.imagegallery.slice(index, index + columnsInRow); // Slice the images for each row
        index += columnsInRow; // Update the index for the next row

        const rowStyles = {
          gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`, // Use the value from gridStructure for this row
        };

        return (
          <div key={rowIndex} className={styles.galleryRow} style={rowStyles}>
            {rowImages.map((image, imgIndex) => {
              return <Media medium={image} key={imgIndex} enableFullscreen={true} fieldTitle="image gallery item" />;
            })}
          </div>
        );
      })
    );
  };

  let ErrorMessage = () => {
    return <SanityPreviewFallback fieldTitle="image gallery" />;
  };

  return (
    <section className={styles.imagegallery}>
      {hasSanityValue(project.imagegallery) ? <Images /> : <ErrorMessage />}
    </section>
  );
}

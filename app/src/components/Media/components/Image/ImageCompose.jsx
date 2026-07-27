import { useState } from "react";

import Image from "./Image";
import styles from "../../Media.module.css";
import Placeholder from "../Placeholder";
import { isGifMedium } from "@/lib/media/projectThumbnails";

const ImageCompose = ({ medium, className, eager = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isGif = isGifMedium(medium);
  const containerClassName = [styles.mediaContainer, className].filter(Boolean).join(" ");
  const aspectRatio = medium.width && medium.height ? medium.width / medium.height : undefined;

  return (
    <div className={containerClassName} style={{ aspectRatio }}>
      {!isGif ? <Placeholder medium={medium} isLoaded={isLoaded} /> : null}
      <Image medium={medium} setIsLoaded={setIsLoaded} eager={eager} />
    </div>
  );
};

export default ImageCompose;

import NextImage from "next/image";

import { isGifMedium } from "@/lib/media/projectThumbnails";

const Image = ({ medium, setIsLoaded, eager = false }) => {
  const imageSource = medium.url;
  const isGif = isGifMedium(medium);

  const imageStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    minWidth: 0,
    objectFit: "cover",
    objectPosition: "center",
  };

  if (isGif) {
    return (
      <img
        src={imageSource}
        alt="image"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        style={imageStyle}
        onLoad={() => setIsLoaded?.(true)}
      />
    );
  }

  return (
    <NextImage
      src={imageSource}
      alt="image"
      unoptimized
      fill
      sizes="100vw"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="sync"
      draggable={false}
      style={imageStyle}
      onLoad={() => setIsLoaded?.(true)}
    />
  );
};

export default Image;

"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import SanityPreviewFallback from "@/components/SanityPreviewFallback";
import { StateContext } from "@/context/StateContext";
import ImageCompose from "./components/Image/ImageCompose";
import VideoCompose from "./components/Video/VideoCompose";
import styles from "./Media.module.css";

const RawMedia = ({ className, medium, eager = false, paused, showPlaceholder = true, fieldTitle }) => {
  if (!medium || (!medium.url && !medium.playbackId)) {
    return <SanityPreviewFallback fieldTitle={fieldTitle || "media"} />;
  }

  switch (medium.type) {
    case "image":
      return <ImageCompose medium={medium} className={className} eager={eager} />;
    case "video":
      if (medium.status && medium.status !== "ready") return <p>Video is processing, please wait!</p>;
      if (!medium.aspect_ratio && !medium.url) {
        return <SanityPreviewFallback fieldTitle={fieldTitle || "video aspect ratio"} />;
      }

      return (
        <VideoCompose
          medium={medium}
          className={className}
          eager={eager}
          paused={paused}
          showPlaceholder={showPlaceholder}
        />
      );
    default:
      return <SanityPreviewFallback fieldTitle={fieldTitle || "media"} />;
  }
};

const getMediaAspectRatio = (medium) => {
  if (!medium) return null;

  if (medium.aspect_ratio) {
    const [aspectWidth, aspectHeight] = medium.aspect_ratio.split(":").map(Number);
    if (aspectWidth && aspectHeight) return aspectWidth / aspectHeight;
  }

  if (medium.width && medium.height) return medium.width / medium.height;

  return null;
};

const FullscreenPreview = ({ open, medium, children, setOpen }) => {
  const { deviceDimensions } = useContext(StateContext);

  const handleClose = () => setOpen(false);
  const fullscreenRoot = typeof document !== "undefined" ? document.getElementById("fullscreen-root") : null;

  if (!open || !medium || !fullscreenRoot) return null;

  const mediaAspectRatio = getMediaAspectRatio(medium);
  const deviceAspectRatio = deviceDimensions.width / deviceDimensions.height;

  const getMediaStyle = () => {
    if (!mediaAspectRatio) return {};

    const fitWidth = mediaAspectRatio > deviceAspectRatio;

    return {
      width: fitWidth ? "100%" : "auto",
      height: fitWidth ? "auto" : "100%",
      aspectRatio: mediaAspectRatio,
    };
  };

  return createPortal(
    <div className={styles["fullscreen-preview-outer"]} onClick={handleClose}>
      <div className={`${styles["close-button"]} button`} onClick={handleClose}>
        CLOSE
      </div>
      <div className={styles["fullscreen-preview-inner"]} style={getMediaStyle()}>
        {children}
      </div>
    </div>,
    fullscreenRoot
  );
};

const Media = ({
  className,
  medium,
  eager = false,
  paused,
  showPlaceholder = true,
  enableFullscreen = false,
  fieldTitle,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const media = (
    <RawMedia
      className={className}
      medium={medium}
      eager={eager}
      paused={paused}
      showPlaceholder={showPlaceholder}
      fieldTitle={fieldTitle}
    />
  );

  if (!enableFullscreen) return media;

  return (
    <>
      <button className={styles.fullscreenTrigger} type="button" onClick={() => setOpen(true)}>
        {media}
      </button>
      <FullscreenPreview medium={medium} open={open} setOpen={setOpen}>
        <RawMedia
          className={className}
          medium={medium}
          eager
          paused={paused}
          showPlaceholder={showPlaceholder}
          fieldTitle={fieldTitle}
        />
      </FullscreenPreview>
    </>
  );
};

Media.displayName = "Media";
export default Media;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";

import Icon from "@/components/Icon";

import { useInView } from "framer-motion";

import styles from "./RenderMedia.module.css";

const Media = React.memo(({ medium, setOpen, enableFullscreen }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, margin: "0px 0px -100px 0px" });

  if (!medium) return null; // Handle early return

  const handleFullscreen = () => {
    console.log("handling fullscreen!");
    setOpen(true);
  };

  // Handle Sanity Image
  if (medium.type === "image") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          aspectRatio: medium.width / medium.height,
          cursor: enableFullscreen ? "pointer" : "default",
        }}
      >
        {/* {enableFullscreen && (
          <div className={`button ${styles["fullscreen-button"]}`} onClick={(e) => handleFullscreen(e)}>
            <Icon path="/assets/icons/fullscreen-icon.svg" />
          </div>
        )} */}
        <Image
          src={medium.url}
          alt="image"
          unoptimized
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ width: "100%", height: "auto" }}
          onClick={(e) => {
            if (!enableFullscreen) return; // exit if fullscreen is disabled
            handleFullscreen(e);
          }}
        />
      </div>
    );
  }

  // Handle Mux Video
  if (medium.type === "video") {
    if (medium.status !== "ready") {
      return <p>Video is processing, please wait!</p>;
    }

    if (!medium?.aspect_ratio) return;

    const [aspectWidth, aspectHeight] = medium.aspect_ratio.split(":");

    return (
      <div
        ref={videoRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          aspectRatio: aspectWidth / aspectHeight,
          cursor: enableFullscreen ? "pointer" : "default",
          overflow: "hidden",
        }}
        onClick={(e) => {
          if (!enableFullscreen) return; // exit if fullscreen is disabled
          handleFullscreen(e);
        }}
      >
        {!isLoaded && (
          <Image
            src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=50`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            alt="placeholder image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isLoaded ? 0 : 1,

              zIndex: 1,
              filter: "blur(10px)",
              transform: "scale(2)",

              width: "100%",
              height: "100%",
            }}
          />
        )}
        {isInView && (
          <MuxPlayer
            playbackId={medium.playbackId}
            autoPlay
            controls={false}
            loop
            // poster={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg`}
            preload="metadata"
            as="video"
            muted
            playsInline
            fill
            style={{
              position: "relative",
              opacity: 1,
              zIndex: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onLoadedData={() => setIsLoaded(true)}
          />
        )}
      </div>
    );
  }
});

Media.displayName = "Media";

export const FullscreenPreview = ({ open, medium, children, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return createPortal(
    <div className={styles["fullscreen-preview-outer"]} onClick={() => handleClose()}>
      <div
        className={`${styles["close-button"]} button`}
        onClick={() => {
          handleClose();
        }}
      >
        CLOSE
      </div>
      <div className={styles["fullscreen-preview-inner"]} style={{ aspectRatio: medium.width / medium.height }}>
        {children}
      </div>
    </div>,
    document.getElementById("fullscreen-root") // portal target
  );
};

export default function RenderMedia({ medium, enableFullscreen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <Media medium={medium} setOpen={setOpen} enableFullscreen={enableFullscreen} />
      <FullscreenPreview medium={medium} open={open} setOpen={setOpen}>
        <Media medium={medium} enableFullscreen={false} />
      </FullscreenPreview>
    </>
  );
}

RenderMedia.displayName = "RenderMedia";

"use client";

import React, { useRef } from "react";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";

import { useInView } from "framer-motion";

import { useEffect, useState } from "react";

const RenderMedia = React.memo(({ medium }) => {
  let [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, margin: "0px 0px -100px 0px" });

  if (!medium) return null; // Handle early return

  // Handle Sanity Image
  if (medium.type === "image") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          unoptimized
          src={medium.url}
          alt="image"
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    );
  }

  // Handle Mux Video
  if (medium.type === "video") {
    if (medium.status !== "ready") {
      return <p>Video is processing, please wait!</p>;
    }

    return (
      <div ref={videoRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        <>
          {!isLoaded && (
            <Image
              src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=20`}
              fill
              alt="placeholder image"
              unoptimized
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: isLoaded ? 0 : 1,
                zIndex: 1,
                filter: "blur(3px)",
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
              preload="auto"
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
              onLoadedMetadata={() => setIsLoaded(true)}
            />
          )}
        </>
      </div>
    );
  }
});

RenderMedia.displayName = "RenderMedia";

export default RenderMedia;

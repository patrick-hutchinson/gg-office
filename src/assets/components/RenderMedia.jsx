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
      <div style={{ position: "relative", width: "100%", height: "100%", aspectRatio: medium.width / medium.height }}>
        <Image
          src={medium.url}
          alt="image"
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ width: "100%", height: "auto" }}
          onClick={(e) => e.currentTarget.requestFullscreen()}
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

    const [aspectWidth, aspectHeight] = medium.aspect_ratio?.split(":");

    return (
      <div
        ref={videoRef}
        style={{ position: "relative", width: "100%", height: "100%", aspectRatio: aspectWidth / aspectHeight }}
      >
        {!isLoaded && (
          <Image
            src={`https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=50`}
            fill
            alt="placeholder image"
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
            preload="metadata"
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

RenderMedia.displayName = "RenderMedia";

export default RenderMedia;

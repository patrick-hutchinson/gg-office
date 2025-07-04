"use client";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
// import "@mux/mux-player/dist/styles.css";

import { useEffect, useState } from "react";

export default function RenderMedia({ medium }) {
  let [isLoaded, setIsLoaded] = useState(false);

  if (!medium) return; // Handle early return

  //Render

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
          // fill
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
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
        <MuxPlayer
          playbackId={medium.playbackId}
          autoPlay={true}
          controls={false}
          loop={true}
          muted={true}
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
      </div>
    );
  }
}

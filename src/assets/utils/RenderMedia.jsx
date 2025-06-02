"use client";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";

import { useState } from "react";

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
          width={medium.width ? medium.width : 800}
          height={medium.height ? medium.height : 800}
          placeholder="blur"
          blurDataURL={medium.lqip}
          style={{ objectFit: "cover" }}
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
            // width="20"
            // height="20"
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
          metadata={{
            video_title: "Your Video Title",
            viewer_user_id: "user-id-if-any",
          }}
          autoPlay={true}
          controls={false}
          loop={true}
          muted={true}
          style={{
            position: "relative",
            top: 0,
            left: 0,
            opacity: 1,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
          onLoadedMetadata={() => setIsLoaded(true)}
        />
      </div>
    );
  }
}

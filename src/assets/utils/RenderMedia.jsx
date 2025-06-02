"use client";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";

import { useState } from "react";

export default function RenderMedia({ medium }) {
  let [isLoaded, setIsLoaded] = useState(false);

  if (!medium) return; // Handle early return

  // if (medium.type == "file") {
  //   console.log("triggered type = file");
  //   extension = medium.url.split(".").pop().split("?")[0].toLowerCase();
  // }
  // if (medium._type == "file") {
  //   console.log("triggered _type = file");
  //   extension = getFileSource(medium).split(".").pop().split("?")[0].toLowerCase();
  // }

  // const imageExtensions = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp", "svg"];
  // const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  // Handle Sanity Image
  if (medium.type === "image") {
    return <Image src={medium.url} alt="image" width="800" height="800" placeholder="blur" blurDataURL={medium.lqip} />;
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
            width="20"
            height="20"
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

  // // Handle File Image
  // if (medium._type === "file" && imageExtensions.includes(extension)) {
  //   console.log("type detected: 'file (image)', type: '_type' ");
  //   return <img src={getFileSource(medium)} alt="project image" />;
  // }

  // // Handle File Video
  // if (medium._type === "file" && videoExtensions.includes(extension)) {
  //   console.log("type detected: 'file (video)', type: '_type' ");
  //   return (
  //     <video autoPlay loop muted playsInline>
  //       <source src={getFileSource(medium)} type={`video/${extension}`} />
  //     </video>
  //   );
  // }

  // if (medium.type === "file" && videoExtensions.includes(extension)) {
  //   console.log("type detected: 'file (video)', type: 'type' ");
  //   return (
  //     <video autoPlay loop muted playsInline>
  //       <source src={medium.url} type={`video/${extension}`} />
  //     </video>
  //   );
  // }
}

import { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

import { getStaticVideoRenditionUrl } from "@/lib/media/projectThumbnails";

const Video = ({ medium, playerState, playerControls }) => {
  const src = getStaticVideoRenditionUrl(medium);
  const poster = medium.playbackId ? `https://image.mux.com/${medium.playbackId}/thumbnail.jpg?width=1200` : undefined;

  useEffect(() => {
    const player = playerControls.playerRef.current;
    if (!player) return;

    player.muted = playerControls.muted ?? true;

    if (playerControls.paused) {
      player.pause();
      return;
    }

    const playPromise = player.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [playerControls.muted, playerControls.paused, playerControls.playerRef]);

  if (!playerState.isInView) return null;

  const mediaStyle = {
    position: "relative",
    opacity: 1,
    zIndex: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  if (!src && medium.playbackId) {
    return (
      <MuxPlayer
        ref={playerControls.playerRef}
        playbackId={medium.playbackId}
        autoPlay
        playsInline
        loop
        muted={playerControls.muted ?? true}
        preload={playerState.eager ? "auto" : "metadata"}
        poster={poster}
        controls={false}
        style={mediaStyle}
        onCanPlay={() => playerState.setIsLoaded(true)}
        onTimeUpdate={playerControls.onTimeUpdate}
        onLoadedMetadata={playerControls.onLoadedMetadata}
      />
    );
  }

  if (!src) return null;

  return (
    <video
      ref={playerControls.playerRef}
      src={src}
      autoPlay
      playsInline
      loop
      muted={playerControls.muted ?? true}
      preload={playerState.eager ? "auto" : "metadata"}
      poster={poster}
      style={mediaStyle}
      onCanPlay={() => playerState.setIsLoaded(true)}
      onTimeUpdate={playerControls.onTimeUpdate}
      onLoadedMetadata={playerControls.onLoadedMetadata}
    />
  );
};

export default Video;

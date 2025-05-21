const RenderFile = ({ source }) => {
  const extension = source?.split(".").pop().split("?")[0].toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp", "svg"];
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  return imageExtensions.includes(extension) ? (
    <img src={source} alt="Uploaded content" />
  ) : videoExtensions.includes(extension) ? (
    <video autoPlay loop muted playsInline>
      <source src={source} type={`video/${extension}`} />
    </video>
  ) : null;
};

export default RenderFile;

const RENDITION_PRIORITY = ["highest.mp4", "high.mp4", "medium.mp4", "low.mp4"];

export function getStaticVideoRenditionUrl(medium) {
  if (!medium) return null;

  if (medium.url) return medium.url;

  const files = medium.static_renditions?.files || [];
  const rendition = RENDITION_PRIORITY.map((name) => files.find((file) => file?.name === name)).find(Boolean);

  return rendition?.url || null;
}

export function isGifMedium(medium) {
  return typeof medium?.url === "string" && medium.url.toLowerCase().includes(".gif");
}

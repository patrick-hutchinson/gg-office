/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  // output: "export",
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    domains: ["cdn.sanity.io", "image.mux.com"],
  },
};

export default withPlaiceholder(nextConfig);

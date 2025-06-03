/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    domains: ["cdn.sanity.io", "image.mux.com"],
  },
};

export default nextConfig;

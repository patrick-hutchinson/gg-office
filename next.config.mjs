/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "image.mux.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.glsl$/,
      exclude: /node_modules/,
      use: ["webpack-glsl-loader"],
    });
    return config;
  },
};

export default nextConfig;

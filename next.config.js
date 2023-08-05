module.exports = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
    loader: "custom",
    loaderFile: "./src/utils/cloudinaryLoader.js",
  },
  experimental: {
    appDir: true,
  },
};

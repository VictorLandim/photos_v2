/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
    loader: "custom",
    loaderFile: "./src/utils/cloudinaryLoader.js",
    minimumCacheTTL: 31536000,
  },
};

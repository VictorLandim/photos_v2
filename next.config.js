/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
    loader: "custom",
    loaderFile: "./src/utils/cloudinaryLoader.js",
    minimumCacheTTL: 31536000,
  },
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
        source:
          "/:path(.+\\.(?:ico|png|svg|jpg|jpeg|avif|gif|webp|json|js|css|mp3|mp4|ttf|ttc|otf|woff|woff2)$)",
      },
    ];
  },
};

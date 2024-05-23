const cloudinaryLoader = ({ src, width, quality }) => {
  const params = [
    "f_auto",
    "c_scale",
    `w_${width}`,
    `q_${quality || "90" || "auto"}`,
  ];
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${src}`;
};

export default cloudinaryLoader;

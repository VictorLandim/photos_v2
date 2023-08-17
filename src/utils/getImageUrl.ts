export const getImageUrl = (path: string, width: number | string) =>
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${width}/victorphotos/${path}`;

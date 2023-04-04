import { GalleryImageProps, ImageProps } from "./types";

const imagesToGalleryImages = (images: ImageProps[]): GalleryImageProps[] =>
  images.map(({ id, public_id, format, blurDataUrl, width, height }) => ({
    src: `${public_id}.${format}`,
    width,
    height,
    id,
    blurDataUrl,
  }));

export default imagesToGalleryImages;

import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";
import { Item } from "react-photoswipe-gallery";
import { GalleryImageProps } from "./types";

const renderPhoto = (renderPhotoProps: RenderPhotoProps<GalleryImageProps>) => {
  const {
    imageProps: { src, title, sizes, className },
    layout: { height: renderedHeight, width: renderedWidth },
    photo: { id, blurDataUrl, width, height },
  } = renderPhotoProps;

  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 1000;

  const ASPECT_RATIO = width / height;

  const lightboxWidth = Math.round(
    width > height ? MAX_WIDTH : MAX_HEIGHT * ASPECT_RATIO
  );
  const lightboxHeight = Math.round(lightboxWidth / ASPECT_RATIO);

  const sliderSrc = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${lightboxWidth}/${src}`;

  return (
    <Item
      original={sliderSrc}
      thumbnail={sliderSrc}
      width={lightboxWidth}
      height={lightboxHeight}
    >
      {({ ref, open }) => (
        <Image
          ref={ref as any}
          alt="victor.photos image"
          className={`${className} transform cursor-pointer rounded-sm object-cover brightness-100 transition will-change-auto hover:brightness-110`}
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          title={title}
          src={src}
          width={renderedWidth}
          height={renderedHeight}
          loading={id <= 8 ? "eager" : "lazy"}
          onClick={open}
          sizes={sizes}
        />
      )}
    </Item>
  );
};

export default renderPhoto;

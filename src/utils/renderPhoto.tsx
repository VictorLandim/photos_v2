import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";
import { Item } from "react-photoswipe-gallery";
import { GalleryImageProps } from "./types";
import { getImageUrl } from "./getImageUrl";

const renderPhoto = (renderPhotoProps: RenderPhotoProps<GalleryImageProps>) => {
  const {
    imageProps: { src, title, sizes, className },
    layout: { height: renderedHeight, width: renderedWidth },
    photo: { id, blurDataUrl, width, height },
  } = renderPhotoProps;

  const MAX_SIDE = 1600;
  const ASPECT_RATIO = width / height;

  const lightboxWidth = Math.round(
    width > height ? MAX_SIDE : MAX_SIDE * ASPECT_RATIO
  );
  const lightboxHeight = Math.round(lightboxWidth / ASPECT_RATIO);

  const sliderSrc = getImageUrl(src, lightboxWidth);

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
          className={`${className} cursor-pointer rounded-sm object-cover transition will-change-auto`}
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

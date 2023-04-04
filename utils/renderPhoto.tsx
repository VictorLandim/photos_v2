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

  console.log({ className });

  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 800;

  const ASPECT_RATIO = width / height;

  const sliderWidth = width > height ? MAX_WIDTH : MAX_HEIGHT / ASPECT_RATIO;
  const sliderHeight = width > height ? MAX_HEIGHT : MAX_WIDTH / ASPECT_RATIO;

  return (
    <Item
      original={src}
      thumbnail={src}
      width={sliderWidth}
      height={sliderHeight}
      content={
        <Image
          sizes="30w"
          priority
          alt="victor.photos image"
          style={{
            transform: "translate3d(0, 0, 0)",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          title={title}
          src={src}
          width={sliderWidth}
          height={sliderHeight}
        />
      }
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

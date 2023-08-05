"use client";
import { PhotoAlbum } from "react-photo-album";
import { Gallery as PhotoswipeGallery } from "react-photoswipe-gallery";
import { useMobileLayout } from "../contexts/MobileLayoutContext";
import renderPhoto from "../utils/renderPhoto";
import { GalleryImageProps } from "../utils/types";

type GalleryProps = {
  photos: GalleryImageProps[];
};

const Gallery = ({ photos }: GalleryProps) => {
  const { mobileLayout } = useMobileLayout();

  const targetRowHeight = mobileLayout === "multiple" ? 200 : 500;
  const spacing = mobileLayout === "multiple" ? 8 : 12;

  return (
    <PhotoswipeGallery
      id="photos"
      options={
        {
          // showHideAnimationType: "none",
          // zoomAnimationDuration: false,
        }
      }
    >
      <PhotoAlbum
        layout="rows"
        photos={photos}
        renderPhoto={renderPhoto}
        spacing={spacing}
        padding={0}
        targetRowHeight={targetRowHeight}
      />
    </PhotoswipeGallery>
  );
};

export default Gallery;

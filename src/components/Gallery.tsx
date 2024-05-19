"use client";
import { useGridLayout } from "@/contexts/GridLayoutContext";
import { PhotoAlbum } from "react-photo-album";
import { Gallery as PhotoswipeGallery } from "react-photoswipe-gallery";
import renderPhoto from "../utils/renderPhoto";
import { GalleryImageProps } from "../utils/types";

type GalleryProps = {
  photos: GalleryImageProps[];
};

const Gallery = ({ photos }: GalleryProps) => {
  const { gridLayout } = useGridLayout();

  const targetRowHeight = gridLayout === "multiple" ? 200 : 500;
  const spacing = gridLayout === "multiple" ? 8 : 12;

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

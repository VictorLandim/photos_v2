import { PhotoAlbum } from "react-photo-album";
import { Gallery as PhotoswipeGallery } from "react-photoswipe-gallery";
import renderPhoto from "../utils/renderPhoto";
import { GalleryImageProps } from "../utils/types";

type GalleryProps = {
  photos: GalleryImageProps[];
};

const Gallery = ({ photos }: GalleryProps) => (
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
      spacing={12}
      padding={0}
      targetRowHeight={500}
    />
  </PhotoswipeGallery>
);

export default Gallery;

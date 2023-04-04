export type ImageProps = {
  id: number;
  format: string;
  height: number;
  width: number;
  public_id: string;
  blurDataUrl?: string;
};

export type GalleryImageProps = {
  id: number;
  blurDataUrl?: string;
  width: number;
  height: number;
  src: string;
};

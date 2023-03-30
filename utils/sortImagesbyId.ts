import { ImageProps } from "./types";

const sortImagesById = (a: ImageProps, b: ImageProps) => (a.id > b.id ? 1 : -1);

export default sortImagesById;

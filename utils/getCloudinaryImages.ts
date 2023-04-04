import cloudinary from "./cloudinary";
import getBase64ImageUrl from "./generateBlurPlaceholder";
import getOrderIdFromPublicId from "./getOrderIdFromPublicId";
import { ImageProps } from "./types";
import sortImagesById from "../utils/sortImagesbyId";

const getCloudinaryImages = async (folder: string = "*") => {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${folder}`)
    .max_results(400)
    .execute();

  const reducedPromises: Promise<ImageProps>[] = results.resources.map(
    async (image: ImageProps) => ({
      id: getOrderIdFromPublicId(image.public_id),
      blurDataUrl: await getBase64ImageUrl(image),
      height: image.height,
      width: image.width,
      public_id: image.public_id,
      format: image.format,
    })
  );

  const reducedResults = (await Promise.all(reducedPromises)).sort(
    sortImagesById
  );

  return reducedResults;
};

export default getCloudinaryImages;

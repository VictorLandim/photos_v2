import cloudinary from "./cloudinary";

let cachedAlbumNames: string[];

const getAlbumNames = async () => {
  if (!cachedAlbumNames) {
    const foldersResult = await cloudinary.v2.api.sub_folders(
      process.env.CLOUDINARY_FOLDER
    );

    const albumNames = (foldersResult?.folders ?? [])?.map(
      (folder) => folder?.name
    );
    cachedAlbumNames = albumNames;
  }

  return cachedAlbumNames;
};

export default getAlbumNames;

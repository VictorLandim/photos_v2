import cloudinary from "./cloudinary";

const getAlbumNames = async () => {
  const foldersResult = await cloudinary.v2.api.sub_folders(
    process.env.CLOUDINARY_FOLDER
  );

  const albumNames = (foldersResult?.folders ?? [])?.map(
    (folder) => folder?.name
  );

  return albumNames;
};

export default getAlbumNames;

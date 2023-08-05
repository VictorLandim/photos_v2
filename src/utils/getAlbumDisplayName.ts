import albumMetadata from "./albumMetadata";

export const getAlbumDisplayName = (albumName?: string) => {
  if (!albumName) return "";

  const meta = albumMetadata.find((album) => album.name === albumName);

  if (!meta) return "";
  const name = `${meta.altName} | ${meta.month}-${meta.year}`;

  return name;
};

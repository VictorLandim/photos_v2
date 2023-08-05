import { Metadata, ResolvingMetadata } from "next";
import AlbumHeading from "../components/AlbumHeading";
import Gallery from "../components/Gallery";
import getCloudinaryImages from "../utils/getCloudinaryImages";
import imagesToGalleryImages from "../utils/imagesToGalleryImages";
import meta from "../utils/meta";
import { getAlbumDisplayName } from "@/utils/getAlbumDisplayName";
import { getImageUrl } from "@/utils/getImageUrl";
import albumMetadata, { FEATURED_ALBUM } from "@/utils/albumMetadata";

const HomePage = async () => {
  const { images, latestAlbum } = await getProps();
  const albumDisplayName = getAlbumDisplayName(latestAlbum);
  return (
    <>
      {latestAlbum && <AlbumHeading heading={`Latest: ${albumDisplayName}`} />}
      <Gallery photos={images} />
    </>
  );
};

export default HomePage;

const getProps = async () => {
  // const foldersResult = await cloudinary.v2.api.sub_folders(
  //   process.env.CLOUDINARY_FOLDER
  // );

  const images = await getCloudinaryImages(FEATURED_ALBUM);
  const galleryImages = imagesToGalleryImages(images);

  return {
    images: galleryImages,
    latestAlbum: FEATURED_ALBUM,
  };
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  _props: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const props = await getProps();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const metadata = albumMetadata.find((album) => album.name === FEATURED_ALBUM);

  const featuredImageIndex = metadata?.featuredIndex ?? 0;
  const featuredImage = props.images[featuredImageIndex];
  const imageWidth = 500;
  const imageUrl = getImageUrl(featuredImage.src, imageWidth);

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [imageUrl, ...previousImages],
    },
  };
}

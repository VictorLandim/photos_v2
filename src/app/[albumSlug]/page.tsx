import albumMetadata from "@/utils/albumMetadata";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import { getAlbumDisplayName } from "@/utils/getAlbumDisplayName";
import getAlbumNames from "@/utils/getAlbumNames";
import getCloudinaryImages from "@/utils/getCloudinaryImages";
import { getImageUrl } from "@/utils/getImageUrl";
import imagesToGalleryImages from "@/utils/imagesToGalleryImages";
import meta from "@/utils/meta";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";

type PageProps = {
  params: {
    albumSlug: string;
  };
};

const AlbumDetailPage = async (props: PageProps) => {
  const { albumSlug } = props.params;
  const meta = albumMetadata.find((album) => album.name === albumSlug);

  if (!meta?.name) return notFound();

  const { images } = await getProps({ albumSlug });

  const src = `victorphotos/${meta.name}/${meta.featuredImagePath}`;
  const [public_id, format] = src.split(".");

  const blurDataURL = await getBase64ImageUrl({
    public_id,
    format,
  });

  return <Content images={images} meta={meta} blurDataURL={blurDataURL} />;
};

export default AlbumDetailPage;

const getProps = async ({ albumSlug }) => {
  const images = await getCloudinaryImages(albumSlug);
  const galleryImages = imagesToGalleryImages(images).sort((a, b) =>
    a.src.localeCompare(b.src, undefined, { numeric: true })
  );

  return {
    images: galleryImages,
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const props = await getProps({ albumSlug: params.albumSlug });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const metadata = albumMetadata.find(
    (album) => album.name === params.albumSlug
  );

  if (!metadata) return {};

  const imageWidth = 500;
  const path = `victorphotos/${params.albumSlug}/${metadata.featuredImagePath}`;
  const imageUrl = getImageUrl(path, imageWidth);

  const description = metadata?.description ?? "";

  return {
    ...meta,
    title: `${getAlbumDisplayName(params.albumSlug)} | ${meta.title}`,
    openGraph: {
      ...meta.openGraph,
      title: getAlbumDisplayName(params.albumSlug),
      description,
      images: [imageUrl, ...previousImages],
    },
  };
}

export const generateStaticParams = async () => {
  const albumNames = await getAlbumNames();
  const albumSlugs = albumNames.map((album) => ({ albumSlug: album }));
  return albumSlugs;
};

import AlbumHeading from "@/components/AlbumHeading";
import Gallery from "@/components/Gallery";
import { SunnyShotLink } from "@/components/SunnyShotLink";
import albumMetadata from "@/utils/albumMetadata";
import { getAlbumDisplayName } from "@/utils/getAlbumDisplayName";
import getAlbumNames from "@/utils/getAlbumNames";
import getCloudinaryImages from "@/utils/getCloudinaryImages";
import { getImageUrl } from "@/utils/getImageUrl";
import imagesToGalleryImages from "@/utils/imagesToGalleryImages";
import meta from "@/utils/meta";
import {
  ArrowUpOnSquareIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    albumSlug: string;
  };
};

const AlbumDetailPage = async (props: PageProps) => {
  const { albumSlug } = props.params;
  const meta = albumMetadata.find((album) => album.name === albumSlug);

  if (!meta?.name) return notFound();

  const albumName = `${meta.altName}`;

  const { images } = await getProps({ albumSlug });
  const Header = () => {
    return (
      <header className="">
        <div className="mb-4 flex items-center justify-between p-2 lg:mb-8">
          <div className="flex items-center gap-1 text-sm font-bold text-gray-950 lg:text-base dark:text-gray-100">
            <SunnyShotLink />
            <div className="div">/</div>
            <div className="font-bold">victor</div>
          </div>

          <button className="flex size-8 appearance-none items-center justify-center rounded-full border border-current bg-gray-50 text-gray-700 transition-all hover:bg-gray-200 lg:size-10 dark:bg-neutral-900 dark:text-gray-100 dark:hover:bg-neutral-800">
            <ArrowUpOnSquareIcon className="size-5" />
          </button>
        </div>
        <div className="mx-auto max-w-xs text-center">
          <p className="mb-2 text-base text-gray-500 dark:text-gray-200">{`${meta.month} ${meta.year} - ${images.length} photos`}</p>
          <h1 className="mb-4 text-5xl font-bold text-gray-900 lg:text-7xl dark:text-white">
            {albumName}
          </h1>
          <p className="text-lg text-gray-400">{meta.description}</p>
        </div>

        <AlbumHeading />
      </header>
    );
  };

  return (
    <div className="p-3">
      <Header />
      <Gallery photos={images} />
    </div>
  );
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

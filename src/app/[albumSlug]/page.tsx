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
  ChevronRightIcon,
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
        <div className="mb-4 flex items-center justify-between px-2 py-2 lg:mb-8">
          <SunnyShotLink />

          <button className="flex size-8 appearance-none items-center justify-center rounded-full border border-current bg-gray-50 text-gray-700 transition-all hover:bg-gray-200 lg:size-10 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <ArrowUpOnSquareIcon className="size-5" />
          </button>
        </div>
        <div className="text-center">
          <p className="mb-2 text-base text-gray-500 dark:text-gray-200">{`${meta.month} ${meta.year} - ${images.length} photos`}</p>
          <h1 className="mb-4 text-5xl font-bold text-gray-900 lg:text-7xl dark:text-white">
            {albumName}
          </h1>
          <p className="text-lg text-gray-400">{meta.description}</p>
        </div>

        <div className="mb-4 mt-12 flex items-end justify-between lg:mt-12">
          <div className="flex gap-2">
            <img
              alt="avatar"
              className="size-10 rounded-full shadow-lg outline outline-2 outline-white lg:size-12 dark:outline-black"
              src="https://avatars.githubusercontent.com/u/5438965?v=4"
            />
            <div className="flex flex-col dark:text-white">
              <div className="text-base font-bold text-gray-800 lg:text-lg dark:text-gray-100">
                Victor Lan
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                @victor
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-base text-gray-500 hover:underline lg:text-lg dark:text-gray-300"
          >
            <span>See trips</span>
            <ChevronRightIcon className="size-4" />
          </Link>
        </div>
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
  const galleryImages = imagesToGalleryImages(images);

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

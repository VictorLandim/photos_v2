import AlbumHeading from "@/components/AlbumHeading";
import Gallery from "@/components/Gallery";
import { ShareButton } from "@/components/ShareButton";
import { SunnyShotLink } from "@/components/SunnyShotLink";
import albumMetadata from "@/utils/albumMetadata";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import { getAlbumDisplayName } from "@/utils/getAlbumDisplayName";
import getAlbumNames from "@/utils/getAlbumNames";
import getCloudinaryImages from "@/utils/getCloudinaryImages";
import { getImageUrl } from "@/utils/getImageUrl";
import imagesToGalleryImages from "@/utils/imagesToGalleryImages";
import meta from "@/utils/meta";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
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

  const size = 1000;
  const src = `victorphotos/${albumSlug}/${meta.featuredImagePath}`;

  const [public_id, format] = src.split(".");
  const blurDataURL = await getBase64ImageUrl({
    public_id,
    format,
  });

  const { images } = await getProps({ albumSlug });

  const Header = () => {
    return (
      <header className="relative p-3">
        <Image
          alt={meta.altName}
          className="absolute inset-0 h-full w-full object-cover"
          title={meta.altName}
          placeholder="blur"
          blurDataURL={blurDataURL}
          src={src}
          loading="eager"
          width={size}
          height={size}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75 backdrop-blur-0"></div>
        <div className="relative">
          <div className="mb-4 flex items-center justify-between p-2 lg:mb-8">
            <div className="flex items-center gap-1 text-sm font-bold text-gray-100 lg:text-base">
              <SunnyShotLink />
              <div className="div">/</div>
              <div className="font-bold">victor</div>
            </div>

            <div className="*:bg-transparent *:dark:bg-transparent">
              <ShareButton />
            </div>
          </div>
          <div className="mx-auto max-w-xs pb-24 pt-6 text-center lg:max-w-full">
            <p className="mb-2 text-base text-gray-200">{`${meta.month} ${meta.year} - ${images.length} photos`}</p>
            <h1 className="mb-4 text-5xl font-bold text-white lg:text-7xl">
              {meta.altName}
            </h1>
            {meta.country && (
              <p className="mb-4 inline-block rounded-full border border-gray-300 px-4 py-1 text-lg  font-semibold text-gray-100 lg:text-xl">
                {meta.country}
              </p>
            )}
            <p className="mx-auto max-w-lg text-lg text-gray-100">
              {meta.description}
            </p>
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-black">
      <Header />
      <AlbumHeading />
      <div className="p-3">
        <Gallery photos={images} />
      </div>
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

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
      <header className="relative h-[475px] pt-8 lg:h-[450px] lg:pt-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-black/50 backdrop-blur-0"></div>

        <div className="relative flex h-full flex-col justify-center p-3">
          <div className="mx-auto max-w-xs text-center lg:mx-0 lg:max-w-full">
            <p className="mb-3 text-base text-gray-200">{`${meta.month} ${meta.year} • ${images.length} photos`}</p>

            {meta.country && (
              <p className="mb-1 inline-block rounded-full border border-gray-300 px-3 py-0.5 text-base  font-semibold text-gray-100 lg:text-base">
                {meta.country}
              </p>
            )}

            <h1 className="mb-4 text-5xl font-bold text-white lg:text-7xl">
              {meta.altName}
            </h1>
            <p className="mx-auto max-w-md text-lg text-gray-100">
              {meta.description}
            </p>
            <div className="mt-3 flex justify-center">
              <ShareButton />
            </div>
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="relative bg-gray-100 dark:bg-black">
      <div className="absolute inset-0">
        <AlbumHeading />
      </div>
      <Header />

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

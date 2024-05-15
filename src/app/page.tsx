import { AlbumGrid } from "@/components/AlbumGrid";
import { Container } from "@/components/Container";
import { SunnyShotLink } from "@/components/SunnyShotLink";
import albumMetadata, { FEATURED_ALBUM } from "@/utils/albumMetadata";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import getAlbumNames from "@/utils/getAlbumNames";
import { getImageUrl } from "@/utils/getImageUrl";
import meta from "@/utils/meta";
import {
  GlobeAmericasIcon,
  MapPinIcon,
  ShareIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import heroImg from "../../public/assets/balos2.webp";

const Hero = () => (
  <div className="relative">
    <div className="relative h-[160px] w-full overflow-hidden rounded-none lg:h-[330px]">
      <Image
        unoptimized
        alt="hero image"
        className="absolute inset-0 object-cover object-[center_65%]"
        src={heroImg.src}
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/5"></div>
      <div className="p-4">
        <SunnyShotLink white />
      </div>
    </div>
    <Container className="relative -mt-4 flex items-center justify-between lg:-mt-8">
      <div className="relative flex gap-4 lg:gap-8">
        <div className="relative">
          <img
            alt="avatar"
            className="size-24 rounded-full shadow-lg outline outline-4 outline-white lg:size-40 lg:outline-[6px] dark:outline-black"
            src="https://avatars.githubusercontent.com/u/5438965?v=4"
          />
          <div className="absolute bottom-[46px] left-1/2 flex -translate-x-1/2 scale-75 items-center gap-1 rounded-full bg-pink-400 px-3 py-1 text-xs font-medium uppercase shadow-lg lg:scale-100">
            <SunIcon className="size-4" />

            <span>pioneer</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1 lg:mt-14 lg:gap-2">
          <div className="flex items-end">
            <div className="flex items-center gap-2">
              <h5 className="text-2xl font-bold text-gray-950 lg:text-5xl dark:text-white">
                Victor Lan
              </h5>
              <pre className="hidden text-base font-bold text-gray-800 lg:block lg:text-2xl dark:text-gray-400">
                • @victor
              </pre>
            </div>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 lg:text-base dark:text-gray-400">
            <MapPinIcon className="size-4" />
            Cluj-Napoca
          </p>
          <div className="mt-4 flex items-center gap-8">
            {[
              ["9", "albums"],
              ["321", "photos"],
              ["13k", "views"],
            ].map((item) => {
              return (
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-base font-medium text-gray-900 lg:text-lg dark:text-gray-50">
                    {item[0]}
                  </span>
                  <span className="text-xs uppercase text-gray-500 lg:text-sm">
                    {item[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-3 self-start lg:mt-14 lg:gap-4">
        {[GlobeAmericasIcon, ShareIcon].map((Icon) => (
          <button className="inline-flex size-8 appearance-none items-center justify-center rounded-full border border-gray-300 bg-slate-100 text-gray-800 transition-all hover:bg-gray-100 lg:size-12 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
            <Icon className="size-4 lg:size-5" />
          </button>
        ))}
      </div>
    </Container>
  </div>
);

const Albums = async () => {
  const { albumList } = await getProps();

  return (
    <div>
      <Hero />
      <Container className="my-8 lg:my-12">
        <div className="h-[0.5px] bg-gray-300 dark:bg-neutral-700" />
      </Container>
      <AlbumGrid albumList={albumList} />
    </div>
  );
};

export default Albums;

const getProps = async () => {
  const albumNames = await getAlbumNames();

  const albumPromiseList = albumNames.map(async (m) => {
    const metadata = albumMetadata.find((x) => x.name === m);

    const [public_id, format] = metadata.featuredImagePath.split(".");

    const featuredImageBlurUrl = await getBase64ImageUrl({
      public_id,
      format,
    });

    return {
      ...metadata,
      featuredImageBlurUrl,
    };
  });

  const albumList = await Promise.all(albumPromiseList);

  return {
    albumList,
  };
};

export async function generateMetadata(
  {},
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const metadata = albumMetadata.find((album) => album.name === FEATURED_ALBUM);

  const imageWidth = 500;
  const path = `victorphotos/${FEATURED_ALBUM}/${metadata.featuredImagePath}`;
  const imageUrl = getImageUrl(path, imageWidth);

  return {
    ...meta,
    title: `${meta.title} | Made with SunnyShot`,
    openGraph: {
      ...meta.openGraph,
      images: [imageUrl, ...previousImages],
    },
  };
}

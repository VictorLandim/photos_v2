import { AlbumGrid, Item } from "@/components/AlbumGrid";
import { Container } from "@/components/Container";
import { ShareButton } from "@/components/ShareButton";
import { SunnyShotLink } from "@/components/SunnyShotLink";
import albumMetadata, { FEATURED_ALBUM } from "@/utils/albumMetadata";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import getAlbumNames from "@/utils/getAlbumNames";
import { getImageUrl } from "@/utils/getImageUrl";
import meta from "@/utils/meta";
import { MapPinIcon, SunIcon } from "@heroicons/react/24/solid";
import "leaflet/dist/leaflet.css";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import heroImg from "../../public/assets/balos2.webp";
import profile from "../../public/profile.jpeg";

const Hero = ({ albumList }: { albumList: Item[] }) => {
  const albums = albumList.length;
  const photos = albumList.reduce((prev, curr) => {
    return curr.count + prev;
  }, 0);

  const countries = new Set(
    albumList.map((item) => item.country).filter(Boolean)
  ).size;

  return (
    <div className="relative">
      <div className="relative h-[125px] w-full overflow-hidden rounded-none lg:h-[250px]">
        <Image
          unoptimized
          alt="hero image"
          className="absolute inset-0 object-cover object-[center_62%]"
          src={heroImg.src}
          blurDataURL={heroImg.blurDataURL}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/5"></div>
        <div className="p-5">
          <SunnyShotLink white />
        </div>
      </div>
      <Container className="relative -mt-4 flex items-center justify-between lg:-mt-8">
        <div className="relative flex gap-6 text-white lg:gap-8">
          <div className="relative shrink-0">
            <img
              alt="avatar"
              className="size-24 rounded-full outline outline-4 outline-white lg:size-40 lg:outline-[6px] dark:outline-black"
              src={profile.src}
            />
            <div className="absolute bottom-[40px] left-1/2 flex -translate-x-1/2 scale-75 items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1 text-xs font-medium uppercase shadow-lg lg:bottom-[35px] lg:scale-100">
              <SunIcon className="size-4" />

              <span>pioneer</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col lg:mt-14">
            <div className="flex items-end">
              <div className="flex items-center gap-2 lg:mb-1">
                <h5 className="text-2xl font-bold text-gray-950 lg:text-4xl dark:text-white">
                  Victor Lan
                </h5>
                <pre className="hidden text-base font-bold text-gray-800 lg:block lg:text-2xl dark:text-gray-400">
                  • @victor
                </pre>
              </div>
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 lg:text-lg dark:text-gray-400">
              <MapPinIcon className="size-4" />
              Cluj-Napoca
            </p>
            <div className="mt-6 flex items-center gap-4 lg:mt-6 lg:gap-5">
              {[
                [albums, "albums"],
                [photos, "photos"],
                [countries, "countries"],
              ].map((item) => {
                return (
                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-xs font-bold text-gray-900 lg:text-base dark:text-gray-50">
                      {item[0]}
                    </span>
                    <span className="text-xs font-medium uppercase text-gray-500 lg:text-sm">
                      {item[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-3 self-start lg:mt-14 lg:gap-4">
          <ShareButton />
        </div>
      </Container>
    </div>
  );
};

const Albums = async () => {
  const { albumList } = await getProps();

  return (
    <div>
      <Hero albumList={albumList} />
      <Container className="mt-8">
        <div className="h-[0.5px] bg-gray-300 dark:bg-neutral-800" />
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

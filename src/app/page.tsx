import { AlbumGrid, Item } from "@/components/AlbumGrid";
import { Container } from "@/components/Container";
import albumMetadata, { FEATURED_ALBUM } from "@/utils/albumMetadata";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import getAlbumNames from "@/utils/getAlbumNames";
import { getImageUrl } from "@/utils/getImageUrl";
import meta from "@/utils/meta";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
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
    <div className="relative w-full rounded-none">
      <div className="relative h-[120px] overflow-hidden rounded-b-xl lg:h-[200px]">
        <Image
          unoptimized
          priority
          alt="Featured image"
          className="absolute inset-0 object-cover object-[center_59%]"
          src={heroImg}
          placeholder="blur"
          sizes="100vw"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/50 dark:from-black/50 dark:to-black/40"></div>
      </div>

      <Container className="relative flex items-center justify-between">
        <div className="relative flex w-full gap-6 text-white lg:gap-8">
          <div className="relative -mt-4 size-[96px] shrink-0 lg:-mt-10 lg:size-[150px]">
            <Image
              unoptimized
              alt="avatar"
              placeholder="blur"
              className="rounded-full shadow-2xl outline outline-4 outline-white lg:outline-4 dark:outline-black"
              src={profile}
              fill
            />
            <div className="shadow-lglg:py-1 absolute -bottom-[10px] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-2 py-0.5 text-[10px] font-medium uppercase lg:px-3 lg:py-1 lg:text-xs">
              <SunIcon className="size-4" />

              <span>pioneer</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col pt-4">
            <div className="flex">
              <div className="flex items-center gap-2">
                <h5 className="text-2xl font-bold text-gray-50 lg:text-4xl">
                  Victor Lan
                </h5>
                {/* <pre className="hidden text-base font-bold text-gray-800 lg:block lg:text-2xl dark:text-gray-400">
              • @victor
            </pre> */}
              </div>
            </div>
            <div className="flex flex-col items-start gap-0 lg:gap-4">
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-300 lg:text-lg">
                <MapPinIcon className="size-4" />
                Cluj-Napoca
              </p>
              <div className="mt-6 flex items-center gap-6 lg:mt-6 lg:gap-5">
                {[
                  [albums, "albums"],
                  [photos, "photos"],
                  [countries, "countries"],
                ].map((item) => {
                  return (
                    <div className="flex flex-col gap-1 text-center">
                      <span className="text-xs font-bold text-gray-100 lg:text-base">
                        {item[0]}
                      </span>
                      <span className="text-xs font-medium uppercase text-gray-300 lg:text-sm">
                        {item[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="absolute right-4 top-4 flex size-8 appearance-none items-center justify-center self-start rounded-full border border-current bg-black/10 text-gray-200 transition-all hover:bg-black/20 lg:right-8">
          <ArrowUpOnSquareIcon className="size-5" />
        </button>
      </Container>
    </div>
  );
};

const Albums = async () => {
  const { albumList } = await getProps();

  return (
    <div>
      <Hero albumList={albumList} />
      <Container>
        <div className="mb-6 mt-8 h-[0.5px] bg-gray-300 dark:bg-neutral-800" />
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

    const src = `victorphotos/${metadata.name}/${metadata.featuredImagePath}`;
    const [public_id, format] = src.split(".");

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

import Link from "next/link";
import AlbumTitle from "@/components/AlbumTitle";
import getAlbumNames from "@/utils/getAlbumNames";
import meta from "@/utils/meta";
import albumMetadata, {
  AlbumMetadataItem,
  FEATURED_ALBUM,
} from "@/utils/albumMetadata";
import { Metadata, ResolvingMetadata } from "next";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";

const Albums = async () => {
  const { albumsByYearArray } = await getProps();

  return (
    <>
      {albumsByYearArray.map(({ year, items }) => (
        <ul key={year} className="mb-8 text-white">
          <h2 className="mb-3 text-lg tracking-wider">{year}</h2>
          <div className="grid grid-cols-1 justify-items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((album) => {
              const albumSlug = album.name;
              const name = album.altName;
              const isFilm = album.isFilm;
              const imageBlurUrl = album.featuredImageBlurUrl;
              const size = 200;
              const src = `victorphotos/${albumSlug}/${album.featuredImagePath}`;
              return (
                <Link href={`/${albumSlug}`} className="w-full">
                  <div className="rounded-sm border border-white/10 transition-all hover:scale-[1.01]">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-sm border-b border-b-white/10">
                      <Image
                        alt={name}
                        className="h-full w-full rounded-t-sm object-cover"
                        style={{ transform: "translate3d(0, 0, 0)" }}
                        placeholder="blur"
                        blurDataURL={imageBlurUrl}
                        title={name}
                        src={src}
                        loading="eager"
                        width={size}
                        height={size}
                      />
                    </div>
                    <div className="flex flex-col gap-2 px-2 py-3">
                      <AlbumTitle name={name} isFilm={isFilm} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </ul>
      ))}
    </>
  );
};

export default Albums;

type Item = AlbumMetadataItem & {
  featuredImageBlurUrl: string;
};

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

  const albumsByYear: Record<string, Item[]> = albumList.reduce((acc, curr) => {
    const key = curr.year;

    acc[key] = acc[key] || [];

    const albums = [...acc[key], curr].sort(
      // newest first
      (a, b) => Number(b.month) - Number(a.month)
    );
    acc[key] = albums;
    return acc;
  }, {});

  const albumsByYearArray = Object.keys(albumsByYear)
    .map((key) => ({
      year: key,
      items: albumsByYear[key],
    }))
    // newest first
    .sort((a, b) => Number(b.year) - Number(a.year));

  return {
    albumsByYearArray,
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
  const imageUrl = getImageUrl(metadata?.featuredImagePath, imageWidth);

  return {
    ...meta,
    title: `albums | ${meta.title}`,
    openGraph: {
      ...meta.openGraph,
      images: [imageUrl, ...previousImages],
    },
  };
}

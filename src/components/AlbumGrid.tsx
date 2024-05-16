"use client";

import { Container } from "@/components/Container";
import { AlbumMetadataItem } from "@/utils/albumMetadata";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type Item = AlbumMetadataItem & {
  featuredImageBlurUrl: string;
};

type AlbumGridProps = {
  albumList: Item[];
};

const renderPhoto = ({ photo }, i) => {
  const albumSlug = photo.name;
  const date = `${photo?.month} ${photo.year}`;
  const name = photo.altName;
  const imageBlurUrl = photo.featuredImageBlurUrl;
  const size = 300;
  const src = `victorphotos/${albumSlug}/${photo.featuredImagePath}`;
  return (
    <Link
      href={`/${albumSlug}`}
      className="group h-56 w-full lg:h-80"
      style={{
        gridColumn:
          Math.floor((i + 1) / 2) % 2 ? "span 5 / span 5" : "span 7 / span 7",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl">
        <Image
          alt={name}
          className="absolute inset-0 h-full w-full rounded-t-sm object-cover transition-all duration-200 lg:group-hover:scale-110"
          placeholder="blur"
          blurDataURL={imageBlurUrl}
          title={name}
          src={src}
          loading="eager"
          width={size}
          height={size}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/20 to-[70%] transition-all duration-300 hover:opacity-90"></div>
        <div className="absolute left-4 top-4 flex gap-2">
          {photo.country && (
            <div className="flex items-center justify-center rounded-full border border-current px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {photo.country}
            </div>
          )}
          <div className="flex items-center justify-center rounded-full border border-current  px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {`${photo.count} photos`}
          </div>
        </div>
        <div className="absolute bottom-6 left-4 flex w-full max-w-full flex-col text-white lg:left-8">
          <p className="text-base">{date}</p>
          <h4 className="w-full max-w-[90%] truncate text-3xl font-bold !leading-tight lg:text-4xl">
            {name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export const AlbumGrid = (props: AlbumGridProps) => {
  return (
    <Container>
      <ul className="mb-8">
        <div className="flex items-start justify-between">
          <h2 className="mb-3 text-lg font-bold text-gray-950 lg:text-2xl dark:text-white">
            Recent trips
          </h2>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">
          {props.albumList.map((item, i) => renderPhoto({ photo: item }, i))}
        </div>
      </ul>
    </Container>
  );
};

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
      className="h-64 w-full lg:h-80"
      style={{
        gridColumn:
          Math.floor((i + 1) / 2) % 2 ? "span 5 / span 5" : "span 7 / span 7",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.015]">
        <Image
          alt={name}
          className="absolute inset-0 h-full w-full rounded-t-sm object-cover"
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL={imageBlurUrl}
          title={name}
          src={src}
          loading="eager"
          width={size}
          height={size}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/20 to-[50%] transition-all duration-300 hover:opacity-90"></div>
        <div className="text-whit absolute bottom-8 left-4 flex max-w-full flex-col lg:left-8">
          <p className="text-sm">{date}</p>
          <h4 className="max-w-full truncate text-4xl font-bold leading-tight">
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
        <div className="flex items-start   justify-between">
          <h2 className="mb-3 text-lg font-bold text-gray-950 lg:text-2xl dark:text-white">
            Recent trips
          </h2>
          <a
            href=""
            className="flex items-center gap-1 text-base text-gray-500 hover:underline lg:text-lg dark:text-gray-300"
          >
            <span>See all</span>
            <ChevronRightIcon className="size-4" />
          </a>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">
          {props.albumList.map((item, i) => renderPhoto({ photo: item }, i))}
        </div>
      </ul>
    </Container>
  );
};

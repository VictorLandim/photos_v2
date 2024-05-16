"use client";

import { Container } from "@/components/Container";
import { AlbumMetadataItem } from "@/utils/albumMetadata";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
      className="group h-56 w-full rounded-xl border border-transparent lg:h-80 dark:border-gray-50/10"
      style={{
        gridColumn:
          Math.floor((i + 1) / 2) % 2 ? "span 5 / span 5" : "span 7 / span 7",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11px] shadow-xl">
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
  const Map = useMemo(
    () =>
      dynamic(() => import("./AlbumsMap").then((mod) => mod.AlbumsMap), {
        ssr: false,
      }),
    []
  );

  return (
    <Container>
      <ul className="mb-8">
        <TabGroup defaultIndex={0}>
          <TabList className="mb-6 flex gap-2">
            {["Gallery", "Map"].map((item) => (
              <Tab
                className="rounded-full px-5 py-2 text-base font-semibold text-gray-950 focus:outline-none

              data-[hover]:bg-black/10
              data-[selected]:bg-black/5
              data-[selected]:data-[hover]:bg-black/5
              data-[focus]:outline-1
              data-[focus]:outline-black/50

              lg:text-2xl

              dark:text-white
              dark:data-[hover]:bg-white/5
              dark:data-[selected]:bg-white/10
              dark:data-[selected]:data-[hover]:bg-white/10
              dark:data-[focus]:outline-white"
              >
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">
                {props.albumList.map((item, i) =>
                  renderPhoto({ photo: item }, i)
                )}
              </div>
            </TabPanel>
            <TabPanel
              className="
            h-[300px] *:*:h-[300px]
            lg:h-[600px] *:*:lg:h-[600px]
            "
            >
              <Map />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ul>
    </Container>
  );
};

"use client";

import { Container } from "@/components/Container";
import { AlbumMetadataItem } from "@/utils/albumMetadata";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

export type Item = AlbumMetadataItem & {
  featuredImageBlurUrl: string;
};

export type AlbumGridProps = {
  albumList: Item[];
};

const renderPhoto = ({ photo }, i) => {
  const albumSlug = photo.name;
  const date = `${photo?.month} ${photo.year}`;
  const name = photo.altName;
  const imageBlurUrl = photo.featuredImageBlurUrl;
  const size = 500;
  const src = `victorphotos/${albumSlug}/${photo.featuredImagePath}`;
  return (
    <Link
      key={albumSlug}
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
          loading={i <= 1 ? "eager" : "lazy"}
          width={size}
          height={size}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/20 to-[70%] transition-all duration-300 hover:opacity-90"></div>

        <div className="absolute left-0 top-4 flex w-full gap-2 px-4">
          <div className="flex flex-wrap items-center gap-2">
            {photo.country && (
              <div className="flex items-center justify-center rounded-full border border-current bg-black/25 px-3 py-1 text-base font-semibold text-white backdrop-blur-sm">
                {photo.country}
              </div>
            )}
            <div className="flex items-center justify-center rounded-full border border-current bg-black/25 px-3 py-1 text-base font-semibold text-white backdrop-blur-sm">
              {`${photo.count} photos`}
            </div>
          </div>

          <div className="ml-auto flex size-8 items-center justify-center rounded-lg bg-black/20 text-gray-100 backdrop-blur-sm transition-all lg:size-10 lg:opacity-0 lg:group-hover:opacity-100">
            <ArrowUturnRightIcon className="size-6 lg:size-8" />
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
  const containerRef = useRef<HTMLUListElement>();
  const Map = useMemo(
    () =>
      dynamic(() => import("./AlbumsMap").then((mod) => mod.AlbumsMap), {
        ssr: false,
      }),
    []
  );

  const onTabChange = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <ul className="mb-8" ref={containerRef}>
        <TabGroup defaultIndex={0} onChange={onTabChange}>
          <TabList className="mb-6 flex gap-2">
            {["Gallery", "Map"].map((item) => (
              <Tab
                key={item}
                className="rounded-full px-5 py-2 text-base font-semibold text-gray-950 focus:outline-none

              data-[hover]:bg-gray-400/10
              data-[selected]:bg-gray-600/10
              data-[selected]:data-[hover]:bg-gray-600/10
              data-[focus]:outline-1
              data-[focus]:outline-black/50

              lg:text-2xl

              dark:text-white
              dark:data-[hover]:bg-white/10
              dark:data-[selected]:bg-white/15
              dark:data-[selected]:data-[hover]:bg-white/15
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
            h-[400px] *:*:h-[400px]
            lg:h-[600px] *:*:lg:h-[600px]
            "
            >
              <Map albumList={props.albumList} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ul>
    </Container>
  );
};

"use client";

import AlbumHeading from "@/components/AlbumHeading";
import Gallery from "@/components/Gallery";
import { useGridLayout } from "@/contexts/GridLayoutContext";
import { AlbumMetadataItem } from "@/utils/albumMetadata";
import { cn } from "@/utils/cn";
import { GalleryImageProps } from "@/utils/types";
import {
  RectangleStackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profileImg from "../../../public/profile.jpeg";

const NAV_HEIGHT = 60;

export const Content = ({
  images,
  meta,
  blurDataURL,
}: {
  images: GalleryImageProps[];
  meta: AlbumMetadataItem;
  blurDataURL: string;
}) => {
  const size = 1000;
  const src = `victorphotos/${meta.name}/${meta.featuredImagePath}`;

  const { gridLayout, setLayout } = useGridLayout();
  const [isIntersecting, setIsIntersecting] = useState(true);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: `-${NAV_HEIGHT}px` }
    );

    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, [ref]);

  const renderStickyNav = () => {
    return (
      <div
        className={cn(
          "relative top-0 z-50 flex items-center justify-between gap-2 overflow-hidden px-4 transition-all duration-200",
          {
            "sticky bg-black/95": !isIntersecting,
          }
        )}
        style={{
          height: NAV_HEIGHT,
          marginTop: -NAV_HEIGHT,
        }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-100">
          <Image
            unoptimized
            width={40}
            height={40}
            alt="avatar"
            className="size-8 rounded-full shadow-lg"
            src={profileImg.src}
          />
          <div
            className={cn(
              "absolute left-[60px] top-1/2 text-nowrap text-lg font-semibold transition-all duration-300",
              {
                "translate-y-full opacity-0": !isIntersecting,
                "-translate-y-1/2 opacity-100": isIntersecting,
              }
            )}
          >
            Victor Lan
          </div>
          <div
            className={cn(
              "absolute left-[60px] top-1/2 flex flex-col items-start gap-1 transition-all duration-300",
              {
                "-translate-y-full opacity-0": isIntersecting,
                "-translate-y-1/2 opacity-100": !isIntersecting,
              }
            )}
          >
            <div className="text-nowrap text-sm font-medium !leading-none text-gray-300">
              Victor Lan
            </div>
            <div className="flex flex-1 transform items-center gap-4 text-lg font-semibold !leading-none lg:text-xl">
              {meta.altName}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["single", "multiple"].map((layout) => {
            const Icon =
              layout === "single" ? RectangleStackIcon : Squares2X2Icon;
            return (
              <button
                key={layout}
                onClick={() => {
                  if (gridLayout !== layout) setLayout(layout as any);
                }}
                className={cn(
                  "flex appearance-none items-center gap-1 text-base transition-all",
                  {
                    "text-gray-500 dark:text-gray-300": gridLayout === layout,
                    "text-gray-300 dark:text-gray-500": gridLayout !== layout,
                  }
                )}
              >
                <Icon className="size-6" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <header className="relative py-28 lg:py-32">
        <AlbumHeading />

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75"></div>

        <div className="relative flex h-full w-full flex-col justify-center">
          <div className="mx-auto max-w-xs text-center lg:mx-0 lg:max-w-full">
            <p className="mb-3 text-base text-gray-200">{`${meta.month} ${meta.year} • ${images.length} photos`}</p>

            {meta.country && (
              <p className="mb-1 inline-block rounded-full border border-gray-300 px-3 py-0.5 text-base  font-semibold text-gray-100 lg:text-base">
                {meta.country}
              </p>
            )}

            <h1 className="mb-4 text-5xl font-bold leading-tight text-white lg:text-7xl">
              {meta.altName}
            </h1>
            <p className="mx-auto max-w-md text-lg text-gray-100">
              {meta.description}
            </p>
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="">
      <div ref={ref}>{renderHeader()}</div>

      {renderStickyNav()}
      <div className="p-2">
        <Gallery photos={images} />
      </div>
    </div>
  );
};

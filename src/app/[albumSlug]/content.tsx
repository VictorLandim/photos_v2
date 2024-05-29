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
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "10px" }
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
          "sticky top-0 z-50 flex h-[60px] items-center justify-between gap-2 bg-black/80 px-4 backdrop-blur-md transition-all duration-200"
        )}
      >
        <div className="flex items-center justify-center gap-4 text-gray-100">
          <Image
            unoptimized
            width={40}
            height={40}
            alt="avatar"
            className="size-8 rounded-full shadow-lg"
            src={profileImg.src}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="text-nowrap text-base/none font-semibold lg:text-lg/none">
              Victor Lan
            </div>
            <div className="text-xs/none">{`${meta.month} ${meta.year}`}</div>
          </div>
          <div
            className={cn(
              "flex flex-1 transform items-center gap-4 text-lg/6 font-semibold transition-all duration-200 lg:text-xl",
              {
                "-translate-y-full opacity-0": isIntersecting,
                "translate-y-0 opacity-100": !isIntersecting,
              }
            )}
          >
            <span className="text-gray-300"> • </span>
            <div className="">{meta.altName}</div>
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
                  "flex appearance-none items-center gap-1 text-base text-gray-500 transition-all dark:text-gray-300",
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-black/50"></div>

        <div className="relative flex h-full w-full flex-col justify-center">
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
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="">
      <div ref={ref}>{renderHeader()}</div>

      {renderStickyNav()}
      <div className="p-3 pt-0">
        <Gallery photos={images} />
      </div>
    </div>
  );
};

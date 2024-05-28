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

const StickyNav = () => {
  const { gridLayout, setLayout } = useGridLayout();
  return (
    <div
      className={cn(
        "sticky top-0 z-50 -mt-[50px] mb-2 flex h-[50px] items-center justify-between gap-2 bg-black/80 px-4 backdrop-blur-md transition-all duration-200 lg:-mt-[60px] lg:h-[60px]"
      )}
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
        <div className="flex items-center">
          <div className="text-base font-semibold lg:text-lg">Victor Lan</div>
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

  const Header = () => {
    return (
      <header className="relative pb-36 pt-28 lg:pb-44 lg:pt-28">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-black/50 backdrop-blur-0"></div>

        <div className="relative mx-4 flex h-full flex-col justify-center lg:mx-0">
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

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-70px" }
    );

    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, [ref]);

  return (
    <div className="">
      <div ref={ref}>
        <Header />
      </div>
      <StickyNav />

      <div className="p-3">
        <Gallery photos={images} />
      </div>
    </div>
  );
};

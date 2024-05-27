"use client";
import {
  ChevronLeftIcon,
  RectangleStackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import profile from "../../public/profile.jpeg";
import logoWhite from "../../public/sunnyshot_pink.svg";
import { cn } from "@/utils/cn";
import { useGridLayout } from "@/contexts/GridLayoutContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AlbumHeading = () => {
  const { gridLayout, setLayout } = useGridLayout();
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const max = 250;
      const currentTop = ref.current.offsetTop;
      const current = currentTop > max ? max : currentTop;
      setScrollProgress(current / max);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-0 z-50 flex h-[60px] items-center justify-between border-0 border-gray-300 px-3 transition-all duration-200 lg:h-[70px] dark:border-gray-800",
        {
          "border-b-[0.5px]": scrollProgress > 0.9,
        }
      )}
    >
      <div
        className="absolute inset-0 -z-10 bg-white dark:bg-black"
        style={{
          opacity: scrollProgress,
        }}
      ></div>
      <Link href="/" className="flex items-center gap-2">
        <ChevronLeftIcon className="size-6 text-white" />
        <Image
          unoptimized
          width={40}
          height={40}
          alt="avatar"
          className="size-8 rounded-full shadow-lg lg:size-8"
          src={profile.src}
        />
        <div className="flex flex-col dark:text-white">
          <div className="text-base/none font-semibold text-gray-800 lg:text-lg/none dark:text-gray-100">
            Victor Lan
          </div>
          {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-200">
            @victor
          </div> */}
        </div>
      </Link>
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

export default AlbumHeading;

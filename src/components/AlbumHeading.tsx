"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ShareButton } from "./ShareButton";

const AlbumHeading = () => {
  return (
    <div className="absolute right-0 top-0 z-50 flex h-[60px] w-full items-center justify-between bg-transparent px-3 lg:h-[70px]">
      <Link
        href="/"
        className="flex items-center gap-2 text-white dark:text-white"
      >
        <ChevronLeftIcon className="size-5" />
        <div className="text-sm font-medium">Back to profile</div>
      </Link>
      <ShareButton />
    </div>
  );
};

export default AlbumHeading;

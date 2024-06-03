"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Container } from "./Container";

const AlbumHeading = () => {
  return (
    <div className="absolute right-0 top-14 z-50 flex h-[60px] w-full items-center justify-between bg-transparent lg:h-[70px]">
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="-ml-0.5 flex items-center gap-1 text-white hover:underline dark:text-white"
        >
          <ChevronLeftIcon className="size-4" />
          <div className="text-sm font-medium">Albums</div>
        </Link>
      </Container>
    </div>
  );
};

export default AlbumHeading;

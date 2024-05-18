"use client";
import {
  RectangleStackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMobileLayout } from "../contexts/MobileLayoutContext";
import profile from "../../public/profile.jpeg";

const AlbumHeading = () => {
  const { mobileLayout, toggle } = useMobileLayout();

  const Icon = mobileLayout === "single" ? Squares2X2Icon : RectangleStackIcon;
  const text = mobileLayout === "single" ? "small" : "large";

  return (
    <div className="sticky top-0 z-50 mt-10 flex items-center justify-between border-b-[0.5px] border-gray-200 bg-gray-100 px-3 py-3 dark:border-gray-800 dark:bg-black">
      <Link href="/" className="flex items-center gap-2">
        <img
          alt="avatar"
          className="size-10 rounded-full shadow-lg outline outline-2 outline-white lg:size-12 dark:outline-black"
          src={profile.src}
        />
        <div className="flex flex-col dark:text-white">
          <div className="text-base/none font-bold text-gray-800 lg:text-lg/none dark:text-gray-100">
            Victor Lan
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-200">
            @victor
          </div>
        </div>
      </Link>
      <button
        onClick={toggle}
        className="flex appearance-none items-center gap-1 text-base text-gray-500 dark:text-gray-300"
      >
        <Icon className="size-6" />
        <span>{text}</span>
      </button>
    </div>
  );
};

export default AlbumHeading;

import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import sunnyshotPink from "../../public/sunnyshot_pink.svg";
import sunnyshotWhite from "../../public/sunnyshot_white.svg";

export const SunnyShotLink = ({ white }: { white?: boolean }) => {
  return (
    <Link
      href="https://sunnyshot.com"
      className={cn(
        "relative inline-flex items-center gap-2 text-sm font-bold lg:text-base",
        {
          "text-pink-500": !white,
          "text-white": white,
        }
      )}
    >
      <Image
        unoptimized
        width={32}
        height={32}
        alt="SunnyShot logo"
        priority
        src={white ? sunnyshotWhite : sunnyshotPink}
        className="size-4 lg:size-5"
      />
      <span>SunnyShot</span>
    </Link>
  );
};

import { cn } from "@/utils/cn";
import Link from "next/link";
import sunnyshotPink from "../../public/sunnyshot_pink.svg";
import sunnyshotWhite from "../../public/sunnyshot_white.svg";

export const SunnyShotLink = ({ white }: { white?: boolean }) => {
  return (
    <Link
      href="https://sunnyshot.com"
      className={cn(
        "inline-flex origin-top-left scale-75 items-center gap-2 text-lg font-bold lg:scale-100",
        {
          "text-pink-500": !white,
          "text-white": white,
        }
      )}
    >
      <img
        src={white ? sunnyshotWhite.src : sunnyshotPink.src}
        className="size-8"
      />
      <span>SunnyShot</span>
    </Link>
  );
};

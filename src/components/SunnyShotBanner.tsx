import Link from "next/link";
import { Container } from "./Container";
import { SunnyShotLink } from "./SunnyShotLink";

export const SunnyShotBanner = () => {
  return (
    <div className="mt-auto flex h-20 w-full items-center border-t border-gray-200 bg-gray-100 px-4 lg:px-8 dark:border-neutral-800 dark:bg-black">
      <Container className="flex items-center justify-between">
        <div className="dark:hidden">
          <SunnyShotLink />
        </div>
        <div className="hidden dark:flex">
          <SunnyShotLink white />
        </div>
        <Link
          href="https://sunnyshot.com/register"
          className="origin-right scale-75 cursor-pointer rounded-full border-2 border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-all hover:border-current hover:bg-transparent hover:text-pink-600 lg:scale-100 dark:bg-white dark:text-black dark:hover:text-white"
        >
          Create profile
        </Link>
      </Container>
    </div>
  );
};

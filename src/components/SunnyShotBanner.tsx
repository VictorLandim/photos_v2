import { SunnyShotLink } from "./SunnyShotLink";

export const SunnyShotBanner = () => {
  return (
    <div className="mt-auto flex h-24 w-full items-center justify-between border-t border-gray-200 bg-gray-100 px-4 backdrop-blur-sm lg:px-8 dark:border-neutral-800 dark:bg-black">
      <SunnyShotLink />
      <a className="origin-right scale-90 cursor-pointer rounded-lg border-2 border-transparent bg-pink-600 px-4 py-2 font-medium text-white transition-all hover:border-current hover:bg-transparent hover:text-pink-600 lg:scale-100 dark:bg-white dark:text-black dark:hover:text-white">
        Create profile
      </a>
    </div>
  );
};

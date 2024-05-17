import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const ShareButton = () => {
  return (
    <button className="flex size-8 appearance-none items-center justify-center rounded-full border border-current bg-gray-50 text-gray-500 transition-all hover:bg-gray-200 lg:size-10 dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800">
      <ArrowUpOnSquareIcon className="size-5" />
    </button>
  );
};

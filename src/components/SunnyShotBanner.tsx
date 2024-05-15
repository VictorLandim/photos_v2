import sunnyshotLogo from "../../public/sunnyshot_pink.svg";

export const SunnyShotBanner = () => {
  return (
    <div className="flex h-14 w-full items-center justify-between border-t border-gray-200 bg-gray-100 px-4 backdrop-blur-sm lg:px-8 dark:border-neutral-800 dark:bg-black">
      <a
        href="https://sunnyshot.com"
        className="flex origin-left scale-90 items-center gap-2 text-lg font-bold text-pink-600 lg:scale-100"
      >
        <img alt="SunnyShot logo" src={sunnyshotLogo.src} className="size-7" />
        <div className="">SunnyShot</div>
      </a>
      <a className="origin-right scale-90 cursor-pointer rounded-lg border-2 border-transparent bg-pink-600 px-4 py-2 font-medium text-white transition-all hover:border-current hover:bg-transparent hover:text-pink-600 lg:scale-100 dark:text-black">
        Create profile
      </a>
    </div>
  );
};

import { useMobileLayout } from "../contexts/MobileLayoutContext";
import Film from "./icons/Film";
import RectangleGroup from "./icons/RectangleGroup";
import RectangleStack from "./icons/RectangleStack";

type AlbumHeadingProps = {
  heading?: string;
};

const AlbumHeading = ({ heading }: AlbumHeadingProps) => {
  const { mobileLayout, toggle } = useMobileLayout();

  if (!heading) return null;

  const onClick = () => {
    toggle();
  };

  const icon =
    mobileLayout === "single" ? <RectangleGroup /> : <RectangleStack />;

  return (
    <div className="mb-4 flex justify-between text-[0.6rem] text-white/60 sm:text-xs">
      <div className="flex items-center gap-2">
        <Film />
        {heading}
      </div>
      <button className="px-1 sm:hidden" onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};

export default AlbumHeading;

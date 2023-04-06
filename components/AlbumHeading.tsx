import { useMobileLayout } from "../contexts/MobileLayoutContext";
import AlbumTitle from "./AlbumTitle";
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
    <div className="mb-4 flex justify-between text-white/60">
      <AlbumTitle name={heading} isFilm />
      <button className="px-1 sm:hidden" onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};

export default AlbumHeading;

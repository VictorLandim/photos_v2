import Camera from "./icons/Camera";
import Film from "./icons/Film";

type AlbumTitleProps = {
  name: string;
  isFilm?: boolean;
};
const AlbumTitle = ({ name, isFilm }: AlbumTitleProps) => (
  <p className="inline-flex items-center gap-2 text-xs text-white/60 hover:underline">
    {isFilm ? <Film /> : <Camera />}
    {name}
  </p>
);

export default AlbumTitle;

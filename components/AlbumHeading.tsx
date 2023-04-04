import Film from "./icons/Film";

type AlbumHeadingProps = {
  heading?: string;
};

const AlbumHeading = ({ heading }: AlbumHeadingProps) =>
  !heading ? null : (
    <p className="mb-4 flex items-center gap-2 text-xs text-white/60">
      <Film />
      {heading}
    </p>
  );

export default AlbumHeading;

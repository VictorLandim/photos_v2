import { DivIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Item } from "./AlbumGrid";

import cloudinaryLoader from "../utils/cloudinaryLoader";

export const AlbumsMap = ({ albumList }: { albumList: Item[] }) => {
  let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  url = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{@2x}.png";

  const icons = albumList
    .filter((album) => !!album.pos)
    .map((album) => {
      return {
        icon: new DivIcon({
          iconSize: [80, 80],
          className:
            "opacity-80 hover:!z-[99999] hover:opacity-100 transition-all",
          html: `
        <a href="/${
          album.name
        }" class="size-[80px] shadow-lg hover:scale-125 transition-all relative flex items-center justify-center h-full w-full rounded-lg border-4 border-white text-black bg-cover bg-center" style="background-image: linear-gradient(to top, rgba(0,0,0,0.99), transparent 60%), url(${cloudinaryLoader(
            {
              src: "victorphotos/" + album.name + "/" + album.featuredImagePath,
              width: 300,
              quality: 70,
            }
          )}) ">
        <div class="absolute -top-3 -right-3 size-6 rounded-full bg-pink-600 text-white font-semibold flex items-center justify-center">${
          album.count
        }</div>
        <div class="absolute bottom-[2px] left-[4px] text-[9px] text-white font-semibold">${
          album.altName
        }</div>
        </a>
       `,
        }),
        pos: album.pos,
      };
    });

  return (
    <MapContainer
      className="[&_.leaflet-div-icon]:size-0!"
      attributionControl={false}
      center={[51.505, -0.09]}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer url={url} />
      {icons.map(({ icon, pos }) => (
        <Marker icon={icon} position={pos as any} />
      ))}
    </MapContainer>
  );
};

import { DivIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Item } from "./AlbumGrid";

import cloudinaryLoader from "../utils/cloudinaryLoader";

export const AlbumsMap = ({ albumList }: { albumList: Item[] }) => {
  const x = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const url =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{@2x}.png";

  const icons = albumList
    .filter((album) => !!album.pos)
    .map((album) => {
      return {
        icon: new DivIcon({
          iconSize: [80, 80],
          className: "opacity-80",

          html: `
        <div class="relative flex items-center justify-center overflow-hidden h-full w-full rounded-lg border-4 border-white text-black bg-cover bg-center" style="background: url(${cloudinaryLoader(
          {
            src: "victorphotos/" + album.name + "/" + album.featuredImagePath,
            width: 100,
            quality: 70,
          }
        )}) ">
        </div>
       `,
        }),
        pos: [album.pos.lat, album.pos.lon],
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

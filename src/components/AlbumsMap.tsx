import { DivIcon, LatLngBounds } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Item } from "./AlbumGrid";

import { useEffect, useState } from "react";
import cloudinaryLoader from "../utils/cloudinaryLoader";

const MAX_BOUNDS = new LatLngBounds([
  [-90, -180],
  [90, 180],
]);
const MAP_CENTER = [15, -20] as any;

export const AlbumsMap = ({ albumList }: { albumList: Item[] }) => {
  const [url, setUrl] = useState(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{@2x}.png"
  );

  useEffect(() => {
    // let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    if (document.querySelector("html")?.classList.contains("dark")) {
      setUrl("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{@2x}.png");
    }
  }, []);

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
        }" class="size-[80px] shadow-lg hover:scale-[1.5] transition-all relative flex items-center justify-center h-full w-full rounded-lg border-4 border-white text-black bg-cover bg-center" style="background-image: linear-gradient(to top, rgba(0,0,0,0.99), transparent 60%), url(${cloudinaryLoader(
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
      center={MAP_CENTER}
      zoom={3}
      minZoom={3}
      maxBounds={MAX_BOUNDS}
      scrollWheelZoom={true}
      maxBoundsViscosity={1}
    >
      <TileLayer noWrap url={url} />
      {icons.map(({ icon, pos }) => (
        <Marker key={pos.toString()} icon={icon} position={pos as any} />
      ))}
    </MapContainer>
  );
};

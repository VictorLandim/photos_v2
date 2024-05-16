import { MapContainer, TileLayer } from "react-leaflet";
export const AlbumsMap = () => {
  const x = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const url =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{@2x}.png";
  return (
    <MapContainer
      attributionControl={false}
      center={[51.505, -0.09]}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer url={url} />
    </MapContainer>
  );
};

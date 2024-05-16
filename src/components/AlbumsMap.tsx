import { MapContainer, TileLayer } from "react-leaflet";
export const AlbumsMap = () => {
  return (
    <div className="relative h-[300px] *:h-[300px] lg:h-[600px] lg:*:h-[600px]">
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

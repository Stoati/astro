import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

function AutoRecenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 16);
  }, [center]);

  return <div />;
}

const icon = new L.Icon({
  iconUrl:
    "https://7djo609uej.ufs.sh/f/RQZnGl1aAYMPSCtunC2Ex9zn0Wk5FvL8MD2HZK3Xfpimj7dI",
  iconSize: new L.Point(35, 45),
});

export default function Map({
  lat,
  lon,
  mapContainerClass,
}: {
  lat: number;
  lon: number;
  mapContainerClass: string;
}) {
  return (
    <div className={mapContainerClass}>
      <MapContainer
        style={{
          width: "100%",
          height: "100%",
        }}
        // @ts-ignore
        center={[lat, lon]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <AutoRecenter center={[lat, lon]} />
        <TileLayer
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={icon}></Marker>
      </MapContainer>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { getLiveElement } from "../../tools/getElement";
import { findGeolocationData } from "../../tools/dataGetter";
import socket, { useSocketStatus } from "../../tools/stoatiSocket";
import type { ProductAttributeGeolocationData } from "../../tools/GeolocationTypes";
import Map from "../../components/Map/Map";

const fetchDataAndSet =
  (setData: (data: ProductAttributeGeolocationData | null) => void) =>
  async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getLiveElement(templateCode);

    const mapData = findGeolocationData(response[0], elementCode);

    setData(mapData ?? null);
  };

export default function LiveGeolocation({
  code,
  containerClass,
  addressClass,
  mapContainerClass,
}: {
  code: string;
  containerClass: string;
  addressClass: string;
  mapContainerClass: string;
}) {
  const [data, setData] = useState<ProductAttributeGeolocationData | null>(
    null
  );

  const socketStatus = useSocketStatus();

  const fetchData = useCallback(fetchDataAndSet(setData), [setData]);

  useEffect(() => {
    if (socketStatus === "connected") {
      socket.emit("subscribeToComponentChange", { code });

      socket.on("componentChange_" + code, function (data) {
        if (data) {
          fetchData(code);
        }
      });
    }
  });

  useEffect(() => {
    fetchData(code);
  }, []);

  if (!data) {
    return <span>Aucune information est disponible</span>;
  }

  return (
    <div className={containerClass}>
      <span className={addressClass}>{data.address}</span>
      <Map
        lat={data.lat}
        lon={data.lon}
        mapContainerClass={mapContainerClass}
      />
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { getLiveElement } from "../../tools/getElement";
import { findGeolocationData } from "../../tools/dataGetter";
import socket, { useSocketStatus } from "../../tools/stoatiSocket";
import type { ProductAttributeGeolocationData } from "../../tools/GeolocationTypes";

import Map from "./Map";

const fetchDataAndSet =
  (setData: (data: ProductAttributeGeolocationData[] | null) => void) =>
  async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getLiveElement(templateCode);

    const mapData = findGeolocationData(response[0].data, elementCode);

    setData(mapData ?? null);
  };

export default function LiveMap({
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
  const [data, setData] = useState<ProductAttributeGeolocationData[] | null>(
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
      <span className={addressClass}>{data[0].address}</span>
      <Map
        lat={data[0].lat}
        lon={data[0].lon}
        mapContainerClass={mapContainerClass}
      />
    </div>
  );
}

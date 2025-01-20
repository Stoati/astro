import getElement from "../../tools/getElement";
import { findGeolocationData } from "../../tools/dataGetter";

import Map from "../Map/Map";

export default async function Geolocation({
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
  const element = await getElement(code);

  const loc = findGeolocationData(element[0].data, "schedule");

  if (!loc) {
    return <span>Aucune information est disponible</span>;
  }

  return (
    <div className={containerClass}>
      <span className={addressClass}>{loc[0].address}</span>
      <Map
        lat={loc[0].lat}
        lon={loc[0].lon}
        mapContainerClass={mapContainerClass}
      />
    </div>
  );
}

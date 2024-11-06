import { useCallback, useEffect, useState } from "react";
import { getLiveElement } from "../tools/getElement";
import { findAssetAttribute } from "../tools/dataGetter";
import socket, { useSocketStatus } from "../tools/stoatiSocket";

const fetchDataAndSet =
  (setData: (data: string) => void) => async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getLiveElement(templateCode);

    const asset = findAssetAttribute(response[0].data, elementCode);

    setData(asset?.data.url ?? "");
  };

export default function LiveMarkdown({
  code,
  alt,
  className,
  width,
  height,
}: {
  code: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [data, setData] = useState<any>(null);

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

  return (
    <img
      src={data}
      className={className}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

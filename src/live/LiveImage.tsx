import { useCallback, useEffect, useState } from "react";
import getElement from "../tools/getElement";
import { findMarkdownAttribute } from "../tools/dataGetter";
import socket, { useSocketStatus } from "../tools/stoatiSocket";
import ReactMarkdown from "react-markdown";

const fetchDataAndSet =
  (setData: (data: string) => void) => async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getElement(templateCode);

    const text = findMarkdownAttribute(response[0].data, elementCode);

    setData(text?.data.markdown ?? "");
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

      socket.on("componentChange", function (data) {
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
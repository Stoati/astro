import { useCallback, useEffect, useState } from "react";
import { getLiveElement } from "../tools/getElement";
import { findMarkdownAttribute } from "../tools/dataGetter";
import socket, { useSocketStatus } from "../tools/stoatiSocket";
import ReactMarkdown from "react-markdown";

const fetchDataAndSet =
  (setData: (data: string) => void) => async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getLiveElement(templateCode);

    const markdown = findMarkdownAttribute(response[0], elementCode);

    setData(markdown?.data.markdown ?? "");
  };

export default function LiveMarkdown({ code }: { code: string }) {
  const [data, setData] = useState<any>(null);

  const socketStatus = useSocketStatus();

  const fetchData = useCallback(fetchDataAndSet(setData), [setData]);

  useEffect(() => {
    if (socketStatus === "connected") {
      socket.emit("subscribeToComponentChange", { code });

      socket.on("componentChange_" + code, function (data) {
        if (data) {
          setData(data);
        }
      });
    }
  });

  useEffect(() => {
    fetchData(code);
  }, []);

  return <ReactMarkdown>{data}</ReactMarkdown>;
}

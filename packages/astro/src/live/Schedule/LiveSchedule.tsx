import { useCallback, useEffect, useState } from "react";
import { getLiveElement } from "../../tools/getElement";
import { findScheduleAttribute } from "../../tools/dataGetter";
import socket, { useSocketStatus } from "../../tools/stoatiSocket";
import type { Schedule } from "../../tools/ScheduleTypes";

const fetchDataAndSet =
  (setData: (data: Schedule | null) => void) => async (code: string) => {
    const templateCode = code.split("#")[0];

    const elementCode = code.split("#")[1];

    const response = await getLiveElement(templateCode);

    const schedule = findScheduleAttribute(response[0].data, elementCode);

    setData(schedule ?? null);
  };

export default function LiveSchedule({ code }: { code: string }) {
  const [data, setData] = useState<Schedule | null>(null);

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

  const schedule = data;

  return (
    <div className="flex flex-col gap-4 w-[200px]">
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Lundi</span>
        <div className="flex flex-col gap-2">
          {schedule.monday.length === 0
            ? "Fermé"
            : schedule.monday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Mardi</span>
        <div className="flex flex-col gap-2">
          {schedule.tuesday.length === 0
            ? "Fermé"
            : schedule.tuesday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Mercredi</span>
        <div className="flex flex-col gap-2">
          {schedule.wednesday.length === 0
            ? "Fermé"
            : schedule.wednesday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Jeudi</span>
        <div className="flex flex-col gap-2">
          {schedule.thursday.length === 0
            ? "Fermé"
            : schedule.thursday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Vendredi</span>
        <div className="flex flex-col gap-2">
          {schedule.friday.length === 0
            ? "Fermé"
            : schedule.friday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Samedi</span>
        <div className="flex flex-col gap-2">
          {schedule.saturday.length === 0
            ? "Fermé"
            : schedule.saturday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <span className="font-bold">Dimanche</span>
        <div className="flex flex-col gap-2">
          {schedule.sunday.length === 0
            ? "Fermé"
            : schedule.sunday.map((item) => {
                return <span>{`${item.start} -${item.stop}`}</span>;
              })}
        </div>
      </div>
    </div>
  );
}

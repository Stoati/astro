import io from "socket.io-client";
import { useStore } from "@nanostores/react";
import { z } from "zod";
import { atom } from "nanostores";

const SocketStatus = z.enum(["disconnected", "connected"]);

type SocketStatus = z.infer<typeof SocketStatus>;

const socketStatusAtom = atom<SocketStatus>(SocketStatus.enum.disconnected);

export const useSocketStatus = () => useStore(socketStatusAtom);

const socket = io("https://api.stoati.fr");
socket.on("connect", function () {
  socketStatusAtom.set(SocketStatus.enum.connected);
});

export default socket;

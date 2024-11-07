import { z } from "astro/zod";
import { Attribute } from "./types";

function checkAndGetStoatiId() {
  if (globalThis.window) {
    const searchParams = new URLSearchParams(window.location.search);

    const liveId = searchParams.get("liveId");

    if (liveId) {
      sessionStorage.setItem("liveId", liveId);
      return liveId;
    }

    const sessionId = sessionStorage.getItem("liveId");

    if (sessionId) {
      return sessionId;
    }
  }

  return import.meta.env.PUBLIC_STOATI_ID;
}

export default async function getElement(elementCode: string) {
  const response = await fetch(
    `https://api.stoati.fr/public/shops/${
      import.meta.env.PUBLIC_STOATI_ID
    }/data/${elementCode}`
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        data: z.array(Attribute),
      })
    )
    .parse(json);
}

export async function getLiveElement(elementCode: string) {
  const id = checkAndGetStoatiId();

  const response = await fetch(
    `https://api.stoati.fr/public/shops/${id}/data/${elementCode}`
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        data: z.array(Attribute),
      })
    )
    .parse(json);
}

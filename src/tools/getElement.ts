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

function checkAndGetLiveSecret() {
  if (globalThis.window) {
    const searchParams = new URLSearchParams(window.location.search);

    const liveSecret = searchParams.get("liveSecret");

    if (liveSecret) {
      sessionStorage.setItem("liveSecret", liveSecret);
      return liveSecret;
    }

    const sessionSecret = sessionStorage.getItem("liveSecret");

    if (sessionSecret) {
      return sessionSecret;
    }
  }

  return import.meta.env.STOATI_SECRET;
}

export default async function getElement(elementCode: string) {
  const id = checkAndGetStoatiId();
  const secret = checkAndGetLiveSecret();

  const response = await fetch(
    `https://api.stoati.fr/shops/${id}/products?productTemplateCode=${elementCode}&withData=true`,
    {
      headers: {
        authorization: `Bearer ${secret}`,
      },
    }
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

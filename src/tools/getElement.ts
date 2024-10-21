import { z } from "astro/zod";
import { Attribute } from "./types";

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
  const secret = checkAndGetLiveSecret();

  const response = await fetch(
    `https://api.stoati.fr/shops/${
      import.meta.env.PUBLIC_STOATI_ID
    }/products?productTemplateCode=${elementCode}&withData=true`,
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

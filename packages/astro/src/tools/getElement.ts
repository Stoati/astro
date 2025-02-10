import { z } from "zod";
import { GetProductWithAttributes } from "./types";
import checkAndGetStoatiId from "./checkAndGetStoatiId";

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

  return z.array(GetProductWithAttributes).parse(json);
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

  return z.array(GetProductWithAttributes).parse(json);
}

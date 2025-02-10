import { z } from "zod";
import checkAndGetStoatiId from "./checkAndGetStoatiId";

export default async function getStyleAttribute(attributeCode: string) {
  const response = await fetch(
    `https://api.stoati.fr/public/shops/${
      import.meta.env.PUBLIC_STOATI_ID
    }/style/${attributeCode}`
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return z
    .array(
      z.object({
        id: z.string(),
        code: z.string(),
        value: z.any(),
      })
    )
    .parse(json);
}

export async function getLiveStyleAttribute(attributeCode: string) {
  const id = checkAndGetStoatiId();

  const response = await fetch(
    `https://api.stoati.fr/public/shops/${id}/style/${attributeCode}`
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();

  return z
    .array(
      z.object({
        id: z.string(),
        code: z.string(),
        value: z.any(),
      })
    )
    .parse(json);
}

import { z } from "astro/zod";
import { Attribute } from "./types";

export default async function getElement(elementCode: string) {
  const response = await fetch(
    `${import.meta.env.PUBLIC_STOATI_URL}/shops/${
      import.meta.env.PUBLIC_STOATI_ID
    }/products?productTemplateCode=${elementCode}&withData=true`,
    {
      headers: {
        authorization: `Bearer ${import.meta.env.STOATI_SECRET}`,
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

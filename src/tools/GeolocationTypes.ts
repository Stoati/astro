import { z } from "zod";

export const ProductAttributeGeolocationData = z.object({
  lat: z.number(),
  lon: z.number(),
  address: z.string(),
});

export type ProductAttributeGeolocationData = z.infer<
  typeof ProductAttributeGeolocationData
>;

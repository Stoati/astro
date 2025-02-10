import { z } from "zod";

export const ProductAttribute = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  templateCode: z.string(),
  data: z.any(),
});

export type ProductAttribute = z.infer<typeof ProductAttribute>;

export const GetProductWithAttributes = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    templateCode: z.string(),
  }),
  attributes: z.array(ProductAttribute),
});

export type GetProductWithAttributes = z.infer<typeof GetProductWithAttributes>;

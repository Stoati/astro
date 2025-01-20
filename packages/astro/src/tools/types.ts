import { z } from "zod";

export const Attribute = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  templateCode: z.string(),
  data: z.any(),
});

export type Attribute = z.infer<typeof Attribute>;

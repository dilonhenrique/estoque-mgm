import { z } from "zod";

const create = z.object({
  name: z.string(),
  products: z.array(
    z.object({
      qty: z.coerce.number(),
      id: z.string().uuid(),
    })
  ),
});

const update = create.partial();

export const serviceSchema = { create, update };

import { object, z } from "zod";

const create = z.object({
  name: z.string(),
  unit: z.string(),
  stock: z.coerce.number(),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  img_url: z.string().optional(),
  category: object({
    id: z.string().uuid().optional().or(z.literal(null)),
    name: z.string().optional(),
  }),
});

const update = create.partial();

export const productSchema = { create, update };

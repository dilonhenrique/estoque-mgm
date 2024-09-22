import { object, z } from "zod";

export const purchaseSchema = z.object({
  // supplier_id: z.string().uuid().optional(),
  // labeled_supplier_id: z.string().optional(),
  supplier: object({
    id: z.string().uuid().optional().or(z.literal("")),
    name: z.string().optional(),
  }),
  items: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
        cost: z.coerce.number().optional(),
      })
    )
    .min(1),
});

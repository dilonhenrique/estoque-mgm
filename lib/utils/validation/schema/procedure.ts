import { object, z } from "zod";

const create = z.object({
  name: z.string(),
  // service_id: z.string().uuid().optional(),
  service: object({
    id: z.string().uuid().optional().or(z.literal(null)),
  }),
  // customer_id: z.string().uuid().optional(),
  // labeled_customer_id: z.string().optional(),
  customer: object({
    id: z.string().uuid().optional().or(z.literal("")),
    name: z.string().optional(),
  }),
  scheduled_for: z.coerce.date().optional(),
  confirmed_by_customer: z.boolean(),
    // .literal("confirmed")
    // .optional()
    // .transform((val) => val === "confirmed"),
  products: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
      })
    )
    .optional(),
});

const update = create.partial();

const setDone = create.required({ scheduled_for: true });

export const procedureSchema = { create, update, setDone };

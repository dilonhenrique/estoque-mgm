import { z } from "zod";
import { addressSchema } from "./address";

const create = z.object({
  name: z.string(),
  email: z.string().email().optional().or(z.literal("")),
  img_url: z.string().optional(),
  birthday: z.coerce.date().optional(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
});

const update = create.partial();

export const customerSchema = { create, update };

import { z } from "zod";

export const addressSchema = z.object({
  zip_code: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string().optional(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
});

import { z } from "zod";
import { validation } from "..";
import { addressSchema } from "./address";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";

const create = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .optional()
    .nullable()
    .or(z.literal(""))
    .transform((val) => (val === "" || val === null ? undefined : val)),
  cnpj: z
    .string()
    .refine(validation.cnpj, "invalid_cnpj")
    .optional()
    .transform(sanitizeStringToOnlyNumber)
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  phone: z.string().optional(),
  address: addressSchema.optional(),
});

const update = create
  .extend({
    address: addressSchema.optional().nullable(),
  })
  .partial();

export const supplierSchema = { create, update };

import { z } from "zod";
import { validation } from "..";
import { addressSchema } from "./address";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }).optional().nullable(),
  cnpj: z
    .string()
    .optional()
    .refine(validation.cnpj, "CNPJ inválido")
    .transform(sanitizeStringToOnlyNumber),
  // .or(z.literal(""))
  // .transform((val) => (val === "" ? undefined : val)),
  phone: z.string().optional(),
  address: addressSchema.optional(),
});

const update = create
  .extend({
    address: addressSchema.optional().nullable(),
  })
  .partial();

export const supplierSchema = { create, update };

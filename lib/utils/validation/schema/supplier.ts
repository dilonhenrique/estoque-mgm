import { z } from "zod";
import { validation } from "..";
import { addressSchema } from "./address";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  cnpj: z
    .string()
    .refine((val) => validation.cnpj(val, true), "CNPJ inválido")
    .transform(sanitizeStringToOnlyNumber),
  phone: z.string().optional().transform(sanitizeStringToOnlyNumber),
  address: addressSchema.optional(),
});

const update = create
  .extend({
    address: addressSchema.optional().nullable(),
  })
  .partial();

export const supplierSchema = { create, update };

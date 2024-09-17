import { object, string } from "yup";
import { validation } from "..";
import { addressSchema } from "./address";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";

const create = object({
  name: string().required(),
  email: string().email().optional(),
  cnpj: string()
    .test("invalid_cnpj", "Cnpj inválido", validation.cnpj)
    .optional()
    .transform(sanitizeStringToOnlyNumber),
  phone: string().optional(),
  address: addressSchema.optional(),
});

const update = create
  // .extend({
  //   address: addressSchema.optional().nullable(),
  // })
  .partial();

export const supplierSchema = { create, update };

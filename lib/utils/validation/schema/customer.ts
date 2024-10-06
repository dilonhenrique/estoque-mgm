import { z } from "zod";
import { addressSchema } from "./address";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }).optional().nullable(),
  img_url: z.string().optional(),
  birthday: z.coerce.date({ message: "Data inválida" }).optional(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
});

const update = create.partial();

export const customerSchema = { create, update };

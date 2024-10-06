import { z } from "zod";

export const addressSchema = z.object({
  zip_code: z.string({ message: "Obrigatório" }).min(8),
  country: z.string({ message: "Obrigatório" }),
  state: z.string({ message: "Obrigatório" }),
  city: z.string({ message: "Obrigatório" }),
  neighborhood: z.string().optional(),
  street: z.string({ message: "Obrigatório" }),
  number: z.string({ message: "Obrigatório" }),
  complement: z.string({ message: "Obrigatório" }).optional(),
});

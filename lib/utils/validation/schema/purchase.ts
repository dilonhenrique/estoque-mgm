import { object, z } from "zod";

export const purchaseSchema = z.object({
  supplier: object({
    id: z.string().uuid({ message: "Id inválido" }).optional().nullable(),
    name: z.string().optional(),
  }),
  items: z
    .array(
      z.object({
        qty: z.coerce.number({ message: "Obrigatório" }),
        id: z
          .string({ message: "Obrigatório" })
          .uuid({ message: "Id inválido" }),
        cost: z.coerce.number({ message: "Número inválido" }).optional(),
      })
    )
    .min(1, "Obrigatório pelo menos 1 produto"),
});

import { z } from "zod";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  products: z
    .array(
      z.object({
        qty: z.coerce.number({ message: "Obrigatório" }),
        id: z
          .string({ message: "Obrigatório" })
          .uuid({ message: "Id inválido" }),
      })
    )
    .optional(),
});

const update = create.partial();

export const serviceSchema = { create, update };

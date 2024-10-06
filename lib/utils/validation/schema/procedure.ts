import { object, z } from "zod";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  service: object({
    id: z.string().uuid({ message: "Id inválido" }).optional().nullable(),
  }),
  customer: object({
    id: z.string().uuid({ message: "Id inválido" }).optional().nullable(),
    name: z.string().optional(),
  }),
  scheduled_for: z.coerce.date({ message: "Data inválida" }).optional(),
  confirmed_by_customer: z.boolean(),
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

const setDone = create.required({ scheduled_for: true });

export const procedureSchema = { create, update, setDone };

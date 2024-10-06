import { object, z } from "zod";

const create = z.object({
  name: z.string({ message: "Obrigatório" }),
  unit: z.string({ message: "Obrigatório" }),
  stock: z.coerce.number({ message: "Obrigatório" }),
  minStock: z.coerce.number({ message: "Número inválido" }).optional(),
  code: z.string().optional(),
  img_url: z.string().optional(),
  category: object({
    id: z.string().uuid({ message: "Id inválido" }).optional().nullable(),
    name: z.string().optional(),
  }),
});

const update = create.partial();

export const productSchema = { create, update };

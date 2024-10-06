import { z } from "zod";
import { LogCause } from "@prisma/client";

export const logSchema = z.object({
  qty: z.coerce.number({ message: "Obrigatório" }),
  cause: z.nativeEnum(LogCause, { message: "Causa inválida" }),
  product_id: z
    .string({ message: "Obrigatório" })
    .uuid({ message: "Id inválido" }),
  procedure_id: z.string().uuid({ message: "Id inválido" }).optional(),
  purchase_id: z.string().uuid({ message: "Id inválido" }).optional(),
});

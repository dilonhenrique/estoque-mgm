import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z.string({ message: "Obrigatório" }),
});

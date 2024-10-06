import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string({ message: "Obrigatório" }),
    email: z
      .string({ message: "Obrigatório" })
      .email({ message: "E-mail inválido" }),
    img_url: z.string().optional(),
    password: z
      .string({ message: "Obrigatório" })
      .min(8, "Deve ter pelo menos 8 caracteres"),
    confirm_password: z.string({ message: "Obrigatório" }),
  })
  .refine(({ confirm_password, password }) => confirm_password === password, {
    message: "As senhas devem ser iguais",
    path: ["confirm_password"],
  });

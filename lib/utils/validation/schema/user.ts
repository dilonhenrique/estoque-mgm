import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    img_url: z.string().optional(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine(({ confirm_password, password }) => confirm_password === password, {
    message: "passwords_must_be_equal",
    path: ["confirm_password"],
  });

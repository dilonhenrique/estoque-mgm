"use server";

import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { object, string } from "zod";
import { MutationResult } from "@/types/types";
import { CredentialError, signIn } from "@/auth";

export default async function login(
  formData: FormData
): Promise<MutationResult<string | undefined | null>> {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = schema.safeParse({ email, password });

  if (!payload.success) {
    const email = payload.error.errors.find((item) =>
      item.path.includes("email")
    )?.message;
    const password = payload.error.errors.find((item) =>
      item.path.includes("password")
    )?.message;

    return {
      success: false,
      errors: {
        ...(email ? { email } : {}),
        ...(password ? { password } : {}),
      },
      status: 400,
    };
  }

  try {
    const response = await signIn("credentials", {
      email: payload.data.email,
      password: payload.data.password,
      redirect: false,
    });

    if (response?.error) throw new CredentialError();

    return { success: true, errors: {}, data: response?.url, status: 200 };
  } catch (e) {
    if (e instanceof CredentialError) {
      return {
        success: false,
        errors: { message: "Não autorizado" },
        status: 401,
      };
    }

    return {
      success: false,
      errors: { message: "Erro interno" },
      status: 500,
    };
  }
}

const schema = object({
  email: string().email(),
  password: string(),
});

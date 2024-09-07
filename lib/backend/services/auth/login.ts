"use server";

import { object, string } from "zod";
import { AnyObject, MutationResult } from "@/types/types";
import { CredentialError, signIn } from "@/auth";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";

export default async function login(
  formData: FormData | AnyObject
): Promise<MutationResult<string | undefined | null>> {
  const data = prepareDataForZod(formData);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return {
      success: false,
      errors: mapZodErrors(payload.error.errors),
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

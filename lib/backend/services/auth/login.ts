"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { CredentialError, signIn } from "@/auth";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { loginSchema } from "@/utils/validation/schema/login";

export default async function login(
  formData: FormData | AnyObject
): Promise<ServiceResult<string | undefined | null>> {
  const data = prepareDataForSchema(formData);
  const payload = loginSchema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  try {
    const response = await signIn("credentials", {
      email: payload.data.email,
      password: payload.data.password,
      redirect: false,
    });

    if (response?.error) throw new CredentialError();

    return serviceResult.success(response.url, "Logado com sucesso!");
  } catch (e) {
    if (e instanceof CredentialError) {
      return serviceResult.error(401, "Não autorizado");
    }

    return serviceResult.error();
  }
}

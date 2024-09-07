"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";
import { validation } from "@/utils/validation";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function update(
  id: string,
  supplier: FormData | AnyObject
): Promise<ServiceResult<Supplier | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(supplier);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await supplierRepo.update(id, {
    name: payload.data.name,
    email: payload.data.email,
    cnpj: payload.data.cnpj,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  cnpj: z
    .string()
    .refine(validation.cnpj, "invalid_cnpj")
    .optional()
    .transform(sanitizeStringToOnlyNumber),
  phone: z.string().optional(),
  address: z
    .object({
      zip_code: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string().optional(),
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
    })
    .optional()
    .nullable(),
});

"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { isEmpty, omitBy } from "lodash";
import { Supplier } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";
import { validation } from "@/utils/validation";

export default async function create(
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Supplier | null>> {
  const user = await getSessionUserOrLogout();

  const data = {
    ...(product instanceof FormData ? Object.fromEntries(product) : product),
    account_id: user.account_id,
  };

  const payload = schema.safeParse(omitBy(data, isEmpty));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const response = await supplierRepo.create({
    account_id: payload.data.account_id,
    name: payload.data.name,
    email: payload.data.email,
    cnpj: payload.data.cnpj,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  account_id: z.string().uuid(),
  name: z.string(),
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
    .optional(),
});

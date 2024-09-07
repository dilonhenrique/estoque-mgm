"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { customerRepo } from "@/backend/repositories/customers";
import { sanitizeEmptyValues } from "@/utils/form/sanitizeEmptyValues";

export default async function update(
  id: string,
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Customer | null>> {
  await getSessionUserOrLogout();

  const data =
    product instanceof FormData ? Object.fromEntries(product) : product;

  const payload = schema.safeParse(sanitizeEmptyValues(data))

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const response = await customerRepo.update(id, {
    name: payload.data.name,
    email: payload.data.email,
    img_url: payload.data.img_url,
    birthday: payload.data.birthday,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  img_url: z.string().optional(),
  birthday: z.coerce.date().optional(),
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

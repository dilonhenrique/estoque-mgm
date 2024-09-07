"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { serviceRepo } from "@/backend/repositories/services";
import { sanitizeEmptyValues } from "@/utils/form/sanitizeEmptyValues";

export default async function update(
  id: string,
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Service | null>> {
  await getSessionUserOrLogout();

  const data =
    product instanceof FormData ? Object.fromEntries(product) : product;

  const payload = schema.safeParse(sanitizeEmptyValues(data));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const response = await serviceRepo.update(id, {
    name: payload.data.name,
    products: payload.data.products,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  // account_id: z.string().uuid(),
  name: z.string(),
  products: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
      })
    )
    .optional(),
});

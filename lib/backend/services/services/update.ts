"use server";

import { isEmpty, omitBy } from "lodash";
import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { Service } from "../../../../types/schemas";
import { mapZodErrors } from "@/utils/mapZodErrors";
import { serviceRepo } from "@/backend/repositories/services";

export default async function update(
  id: string,
  product: FormData
): Promise<MutationResult<Service | null>> {
  await getSessionUserOrLogout();

  const data =
    product instanceof FormData ? Object.fromEntries(product) : product;

  const payload = schema.safeParse(omitBy(data, isEmpty));

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
  account_id: z.string().uuid(),
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

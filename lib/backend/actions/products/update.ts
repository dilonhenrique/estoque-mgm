"use server";

import { omit, isEmpty, omitBy } from "lodash";
import { z } from "zod";
import { productService } from "@/backend/services/products";
import { getSessionUserOrThrow } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { Product } from "../../../../types/schemas";
import { mapZodErrors } from "@/utils/mapZodErrors";

export default async function update(
  product: FormData
): Promise<MutationResult<Product | null>> {
  const user = await getSessionUserOrThrow();

  const data = {
    ...(product instanceof FormData ? Object.fromEntries(product) : product),
    account_id: user.account_id,
  };

  const payload = schema.safeParse(omitBy(data, isEmpty));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const id = payload.data?.id;

  const response = await productService.update(id, omit(payload.data, "id"));

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  id: z.string(),
  account_id: z.string().uuid(),
  name: z.string().optional(),
  unit: z.string().optional(),
  stock: z.coerce.number().optional(),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  image: z.string().optional(),
  brand: z.string().optional(),
});

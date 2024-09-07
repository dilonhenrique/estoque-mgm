"use server";

import { z } from "zod";
import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { resolveCategoryId } from "@/utils/backend/resolveCategoryId";
import { sanitizeEmptyValues } from "@/utils/form/sanitizeEmptyValues";

export default async function update(
  id: string,
  product: FormData | Product
): Promise<MutationResult<Product | null>> {
  await getSessionUserOrLogout();

  const data =
    product instanceof FormData ? Object.fromEntries(product) : product;

  const payload = schema.safeParse(sanitizeEmptyValues(data));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const category_id = await resolveCategoryId(payload.data.category);

  const response = await productRepo.update(id, {
    name: payload.data.name,
    category_id,
    code: payload.data.code,
    img_url: payload.data.img_url,
    minStock: payload.data.minStock,
    unit: payload.data.unit,
    stock: payload.data.stock,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  unit: z.string().optional(),
  stock: z.coerce.number().optional(),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  category: z.string().optional(),
  img_url: z.string().optional(),
});

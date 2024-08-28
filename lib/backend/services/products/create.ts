"use server";

import { z } from "zod";
import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { isEmpty, omitBy } from "lodash";
import { Product } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { resolveCategoryId } from "@/utils/backend/resolveCategoryId";

export default async function create(
  product: FormData
): Promise<MutationResult<Product | null>> {
  const user = await getSessionUserOrLogout();

  const data = {
    ...(product instanceof FormData ? Object.fromEntries(product) : product),
    account_id: user.account_id,
  };

  const payload = schema.safeParse(omitBy(data, isEmpty));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const category_id = await resolveCategoryId(payload.data.category);

  const response = await productRepo.create({
    account_id: payload.data.account_id,
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
  account_id: z.string().uuid(),
  name: z.string(),
  unit: z.string(),
  stock: z.coerce.number({ message: "Required" }),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  category: z.string().optional(),
  img_url: z.string().optional(),
});

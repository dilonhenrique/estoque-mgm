"use server";

import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { resolveCategoryId } from "@/utils/backend/resolveCategoryId";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { productSchema } from "@/utils/validation/schema/product";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Product | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForSchema(product);
  const payload = productSchema.update.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const category_id = (await resolveCategoryId(payload.data.category)) ?? null;

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
  return serviceResult.success(response);
}

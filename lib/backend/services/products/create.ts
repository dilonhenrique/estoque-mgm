"use server";

import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { resolveCategoryId } from "@/utils/backend/resolveCategoryId";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { productSchema } from "@/utils/validation/schema/product";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Product | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = productSchema.create.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const category_id = await resolveCategoryId(payload.data.category);

  const response = await productRepo.create({
    account_id: user.account_id,
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

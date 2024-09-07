"use server";

import { z } from "zod";
import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { resolveCategoryId } from "@/utils/backend/resolveCategoryId";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Product | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
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
  return serviceResult.success(response);
}

const schema = z.object({
  name: z.string().optional(),
  unit: z.string().optional(),
  stock: z.coerce.number().optional(),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  category: z.string().optional(),
  img_url: z.string().optional(),
});

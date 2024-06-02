"use server";

import { omit, isEmpty, omitBy } from "lodash";
import { z } from "zod";
import { productService } from "@/backend/services/products";
import { getSessionUserOrThrow } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import { ActionResult } from "../../../../types/types";

export default async function update(
  formData: FormData
): Promise<ActionResult<boolean>> {
  const user = await getSessionUserOrThrow();

  const data = omitBy(Object.fromEntries(formData), isEmpty);
  data.userId = user._id;

  const payload = schema.safeParse(data);

  if (!payload.success) {
    return { success: false, errors: payload.error.errors };
  }

  const id = payload.data?._id;

  const response = await productService.update(id, omit(payload.data, "_id"));

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: [], data: response };
}

const schema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  unit: z.string().optional(),
  stock: z.coerce.number().optional(),
  minStock: z.coerce.number().optional(),
  userId: z.string(),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  image: z.string().optional(),
  brand: z.string().optional(),
});

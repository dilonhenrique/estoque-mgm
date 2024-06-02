"use server";

import { z } from "zod";
import { productService } from "@/backend/services/products";
import { getSessionUserOrThrow } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import { ActionResult } from "../../../../types/types";
import { isEmpty, omitBy } from "lodash";

export default async function create(
  formData: FormData
): Promise<ActionResult<string | false>> {
  const user = await getSessionUserOrThrow();

  const data = omitBy(Object.fromEntries(formData), isEmpty);
  data.userId = user._id;

  const payload = schema.safeParse(data);

  if (!payload.success) {
    return { success: false, errors: payload.error.errors };
  }

  const response = await productService.create(payload.data);

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: [], data: response };
}

const schema = z.object({
  name: z.string(),
  unit: z.string(),
  stock: z.coerce.number({ message: "Required" }),
  minStock: z.coerce.number().optional(),
  userId: z.string(),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  image: z.string().optional(),
  brand: z.string().optional(),
});

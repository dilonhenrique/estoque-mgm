"use server";

import { z } from "zod";
import { productRepo } from "@/backend/repositories/products";
import { getSessionUserOrThrow } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { isEmpty, omitBy } from "lodash";
import { Product } from "../../../../types/schemas";
import { mapZodErrors } from "@/utils/mapZodErrors";

export default async function create(
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

  const response = await productRepo.create(payload.data);

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
  category_id: z.string().optional(),
  img_url: z.string().optional(),
});

"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { isEmpty, omitBy } from "lodash";
import { Purchase } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { supplierService } from "../suppliers";

export default async function update(
  id: string,
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Purchase | null>> {
  await getSessionUserOrLogout();

  const data =
    product instanceof FormData ? Object.fromEntries(product) : product;

  const payload = schema.safeParse(omitBy(data, isEmpty));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  if (!payload.data.supplier_id && payload.data.labeled_supplier_id) {
    const supplierResponse = await supplierService.create({
      name: payload.data.labeled_supplier_id,
    });
    payload.data.supplier_id = supplierResponse.data?.id;
  }

  const response = await purchaseRepo.update(id, {
    supplier_id: payload.data.supplier_id,
    products: payload.data.products ?? [],
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  supplier_id: z.string().uuid().optional(),
  labeled_supplier_id: z.string().optional(),
  products: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
        cost: z.coerce.number().optional(),
      })
    )
    .optional(),
});

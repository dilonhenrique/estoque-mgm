"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { supplierService } from "../suppliers";
import { sanitizeEmptyValues } from "@/utils/form/sanitizeEmptyValues";

export default async function create(
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Purchase | null>> {
  const user = await getSessionUserOrLogout();

  const data: { [k: string]: any } = {
    ...(product instanceof FormData ? Object.fromEntries(product) : product),
    account_id: user.account_id,
  };

  const payload = schema.safeParse(sanitizeEmptyValues(data));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  if (!payload.data.supplier_id && payload.data.labeled_supplier_id) {
    const supplierResponse = await supplierService.create({
      name: payload.data.labeled_supplier_id,
    });
    payload.data.supplier_id = supplierResponse.data?.id;
  }

  const response = await purchaseRepo.create({
    account_id: payload.data.account_id,
    supplier_id: payload.data.supplier_id,
    products: payload.data.products ?? [],
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  account_id: z.string().uuid(),
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
    .min(1),
});

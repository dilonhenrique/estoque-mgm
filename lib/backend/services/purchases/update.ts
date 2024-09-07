"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { supplierService } from "../suppliers";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Purchase | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
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
  return serviceResult.success(response);
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
    .min(1),
});

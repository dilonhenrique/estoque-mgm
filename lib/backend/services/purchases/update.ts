"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { supplierService } from "../suppliers";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { purchaseSchema } from "@/utils/validation/schema/purchase";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Purchase | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForSchema(product);
  const payload = purchaseSchema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  let supplierId = payload.data.supplier?.id;
  if (!supplierId && payload.data.supplier?.name) {
    const supplierResponse = await supplierService.create({
      name: payload.data.supplier.name,
    });
    supplierId = supplierResponse.data?.id;
  }

  const response = await purchaseRepo.update(id, {
    supplier_id: supplierId,
    products: payload.data.items ?? [],
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

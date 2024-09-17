"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { supplierSchema } from "@/utils/validation/schema/supplier";

export default async function update(
  id: string,
  supplier: FormData | AnyObject
): Promise<ServiceResult<Supplier | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForSchema(supplier);
  const payload = supplierSchema.update.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await supplierRepo.update(id, {
    name: payload.data.name,
    email: payload.data.email,
    cnpj: payload.data.cnpj,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

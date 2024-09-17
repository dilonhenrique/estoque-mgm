"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { supplierSchema } from "@/utils/validation/schema/supplier";
import { validateYupSchema } from "@/utils/form/validateYupSchema";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Supplier | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForSchema(product);
  const payload = validateYupSchema(supplierSchema.create, data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.errors);
  }

  const response = await supplierRepo.create({
    account_id: user.account_id,
    name: payload.data.name,
    email: payload.data.email,
    cnpj: payload.data.cnpj,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

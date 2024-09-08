"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceRepo } from "@/backend/repositories/services";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { serviceSchema } from "@/utils/validation/schema/service";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Service | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = serviceSchema.create.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await serviceRepo.create({
    account_id: user.account_id,
    name: payload.data.name,
    products: payload.data.products,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

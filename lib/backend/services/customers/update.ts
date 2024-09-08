"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerRepo } from "@/backend/repositories/customers";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { customerSchema } from "@/utils/validation/schema/customer";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Customer | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = customerSchema.create.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await customerRepo.update(id, {
    name: payload.data.name,
    email: payload.data.email,
    img_url: payload.data.img_url,
    birthday: payload.data.birthday,
    phone: payload.data.phone,
    address: payload.data.address,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

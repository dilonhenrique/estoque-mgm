"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerRepo } from "@/backend/repositories/customers";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Customer | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await customerRepo.create({
    account_id: user.account_id,
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

const schema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  img_url: z.string().optional(),
  birthday: z.coerce.date().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      zip_code: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string().optional(),
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
    })
    .optional(),
});

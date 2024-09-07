"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceRepo } from "@/backend/repositories/services";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Service | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await serviceRepo.update(id, {
    name: payload.data.name,
    products: payload.data.products,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

const schema = z.object({
  // account_id: z.string().uuid(),
  name: z.string(),
  products: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
      })
    )
    .optional(),
});

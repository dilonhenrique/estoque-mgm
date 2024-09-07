"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, MutationResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { serviceRepo } from "@/backend/repositories/services";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";

export default async function create(
  product: FormData | AnyObject
): Promise<MutationResult<Service | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const response = await serviceRepo.create({
    account_id: user.account_id,
    name: payload.data.name,
    products: payload.data.products,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  name: z.string(),
  products: z.array(
    z.object({
      qty: z.coerce.number(),
      id: z.string().uuid(),
    })
  ),
});

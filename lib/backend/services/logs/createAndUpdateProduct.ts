"use server";

import { logRepo } from "@/backend/repositories/logs";
import { AnyObject, MutationResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { z } from "zod";
import { LogCause } from "@prisma/client";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { revalidatePath } from "next/cache";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";

export default async function createAndUpdateProduct(
  formData: FormData | AnyObject
): Promise<MutationResult<LogComplete>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(formData);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const response = await logRepo.createAndUpdateProduct({
    qty: payload.data.qty,
    cause: payload.data.cause,
    product_id: payload.data.product_id,
    procedure_id: payload.data.procedure_id,
    purchase_id: payload.data.purchase_id,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  qty: z.coerce.number(),
  cause: z.nativeEnum(LogCause),
  product_id: z.string().uuid(),
  procedure_id: z.string().uuid().optional(),
  purchase_id: z.string().uuid().optional(),
});

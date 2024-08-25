"use server";

import { logRepo } from "@/backend/repositories/logs";
import { MutationResult } from "../../../../types/types";
import { LogComplete } from "../../../../types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { z } from "zod";
import { LogCause } from "@prisma/client";
import { isEmpty, omitBy } from "lodash";
import { mapZodErrors } from "@/utils/mapZodErrors";
import { revalidatePath } from "next/cache";

export default async function createAndUpdateProduct(
  formData: FormData | { [k: string]: any }
): Promise<MutationResult<LogComplete>> {
  await getSessionUserOrLogout();

  const data =
    formData instanceof FormData ? Object.fromEntries(formData) : formData;

  const payload = schema.safeParse(omitBy(data, isEmpty));

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

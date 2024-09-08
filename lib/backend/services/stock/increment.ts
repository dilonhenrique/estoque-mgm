"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { stockRepo } from "@/backend/repositories/stock";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function increment(
  id: string,
  increment: number
): Promise<ServiceResult<Product | null>> {
  await getSessionUserOrLogout();

  const response = await stockRepo.increment(id, increment);

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

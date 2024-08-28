"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { stockRepo } from "@/backend/repositories/stock";

export default async function increment(
  id: string,
  increment: number
): Promise<MutationResult<Product | null>> {
  await getSessionUserOrLogout();

  const response = await stockRepo.increment(id, increment);

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

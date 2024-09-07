"use server";

import { ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { stockService } from "@/backend/services/stock";

export default async function increment(
  id: string,
  increment: number
): Promise<ServiceResult<Product | null>> {
  return await stockService.increment(id, increment);
}

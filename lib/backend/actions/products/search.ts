"use server";

import { productService } from "@/backend/services/products";
import { ActionResult, Query } from "../../../../types/types";
import { Product } from "../../../../types/schemas";
import { WithStringId } from "@/utils/parseUtils";

export default async function search(
  query?: Query
): Promise<ActionResult<WithStringId<Product>[]>> {
  const response = await productService.search(query);

  return { success: true, errors: [], data: response };
}

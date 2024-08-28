"use server";

import { productRepo } from "@/backend/repositories/products";
import { MutationResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { Product } from "@/types/schemas";

export default async function search(
  query?: Query
): Promise<MutationResult<SearchList<Product>>> {
  const response = await productRepo.search(query);

  return { success: true, errors: {}, data: response };
}

type Query = {
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};

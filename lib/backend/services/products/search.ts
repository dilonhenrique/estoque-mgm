"use server";

import { productRepo } from "@/backend/repositories/products";
import { ServiceResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { Product } from "@/types/schemas";

export default async function search(
  query?: Query
): Promise<ServiceResult<SearchList<Product>>> {
  const response = await productRepo.search(query);

  return { success: true, fieldErrors: {}, data: response };
}

type Query = {
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};

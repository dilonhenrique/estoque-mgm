"use server";

import { MutationResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { ProductCategory } from "@/types/schemas";
import { categoryRepo } from "@/backend/repositories/categories";
import { getSessionUserOrLogout } from "@/utils/authUtils";

export default async function search(
  query?: Query
): Promise<MutationResult<SearchList<ProductCategory>>> {
  const user = await getSessionUserOrLogout();

  const response = await categoryRepo.search(user.account_id, query);

  return { success: true, errors: {}, data: response };
}

type Query = {
  where?: Prisma.ProductCategoryWhereInput;
  orderBy?: Prisma.ProductCategoryOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};

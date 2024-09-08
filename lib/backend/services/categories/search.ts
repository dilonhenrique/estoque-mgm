"use server";

import { ServiceResult, SearchList } from "@/types/types";
import { Prisma } from "@prisma/client";
import { ProductCategory } from "@/types/schemas";
import { categoryRepo } from "@/backend/repositories/categories";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function search(
  query?: Query
): Promise<ServiceResult<SearchList<ProductCategory>>> {
  const user = await getSessionUserOrLogout();

  const response = await categoryRepo.search(user.account_id, query);

  return serviceResult.success(response);
}

type Query = {
  where?: Prisma.ProductCategoryWhereInput;
  orderBy?: Prisma.ProductCategoryOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};
